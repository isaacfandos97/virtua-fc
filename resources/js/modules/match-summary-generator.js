/**
 * Match summary generator.
 *
 * Produces a sports-journalism-style paragraph summarizing the match result
 * at full time. Composed from template fragments stored in translation files,
 * selected based on match analysis (score, goal distribution, red cards,
 * comebacks, team form, competition context).
 *
 * @module match-summary-generator
 */

import { buildTeamForms, scoreAtMinute } from './atmosphere-generator.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Pick a random template from an array and apply placeholder replacements.
 */
function pickTemplate(templates, replacements) {
    if (!templates || !templates.length) return '';
    const text = templates[Math.floor(Math.random() * templates.length)];
    return applyReplacements(text, replacements);
}

/**
 * Apply all placeholder replacements to a string.
 * Keys are sorted longest-first to prevent partial matches
 * (e.g. `:home` replacing inside `:home_scorer`).
 */
function applyReplacements(text, replacements) {
    let result = text;
    const keys = Object.keys(replacements).sort((a, b) => b.length - a.length);
    for (const key of keys) {
        result = result.replaceAll(key, replacements[key]);
    }
    return result;
}

/**
 * Capitalize the first letter of a string.
 */
function capitalizeFirst(text) {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Format a list of scorer names with "y" / "and" joining.
 * E.g. ["A", "B", "C"] → "A, B y C" (Spanish-style comma + y)
 */
function joinScorers(names) {
    if (names.length === 0) return '';
    if (names.length === 1) return names[0];
    return names.slice(0, -1).join(', ') + ' y ' + names[names.length - 1];
}

/**
 * Build a scorer name with optional annotation (penalty / own goal).
 */
function formatScorerName(event, templates) {
    let name = event.playerName || '?';
    if (event.type === 'own_goal' && templates.summaryOwnGoalNote) {
        name += ' (' + templates.summaryOwnGoalNote + ')';
    } else if (event.metadata?.is_penalty && templates.summaryPenaltyGoalNote) {
        name += ' (' + templates.summaryPenaltyGoalNote + ')';
    }
    return name;
}

/**
 * Count consecutive results at the end of a form array.
 * E.g. ['W', 'L', 'L', 'L'] with char 'L' → 3
 */
function countTrailingStreak(formArray, char) {
    let count = 0;
    for (let i = formArray.length - 1; i >= 0; i--) {
        if (formArray[i] === char) count++;
        else break;
    }
    return count;
}

// ---------------------------------------------------------------------------
// Main generator
// ---------------------------------------------------------------------------

/**
 * Generate a match summary paragraph.
 *
 * @param {Object} config
 * @param {string} config.homeTeamId
 * @param {string} config.awayTeamId
 * @param {string} config.homeTeamName
 * @param {string} config.awayTeamName
 * @param {string} config.homeArticle - 'el', 'la', or null
 * @param {string} config.awayArticle
 * @param {number} config.homeScore - Final home score (regular time)
 * @param {number} config.awayScore - Final away score (regular time)
 * @param {string} config.venueName
 * @param {Object} config.narrativeTemplates - All template arrays from lang files
 * @param {string|null} config.mvpPlayerName
 * @param {string|null} config.mvpPlayerTeamId
 * @param {boolean} config.hasExtraTime
 * @param {number} config.etHomeScore
 * @param {number} config.etAwayScore
 * @param {Object|null} config.penaltyResult - { home, away }
 * @param {Array} config.allEvents - All match events (regular + ET)
 * @param {boolean} config.isKnockout
 * @param {number|null} config.knockoutRoundNumber - 1-6, where 6=final
 * @param {string} config.competitionRole - 'league', 'domestic_cup', 'european'
 * @param {string} config.competitionName
 * @param {Array} config.homeForm - ['W', 'D', 'L', ...] pre-match form
 * @param {Array} config.awayForm
 * @param {string|null} config.tournamentResultType
 * @param {number} config.homePossession - Home possession percentage (0-100)
 * @param {number} config.awayPossession - Away possession percentage (0-100)
 * @returns {string} The composed summary paragraph
 */
export function generateMatchSummary(config) {
    const {
        homeTeamId, awayTeamId,
        homeTeamName, awayTeamName,
        homeArticle, awayArticle,
        homeScore, awayScore,
        venueName,
        narrativeTemplates: t,
        mvpPlayerName, mvpPlayerTeamId,
        hasExtraTime, etHomeScore, etAwayScore,
        penaltyResult,
        allEvents,
        isKnockout,
        knockoutRoundNumber,
        competitionRole,
        competitionName,
        homeForm, awayForm,
        tournamentResultType,
        homePossession, awayPossession,
    } = config;

    // Build article-aware name forms
    const homeForms = buildTeamForms(homeTeamName, homeArticle);
    const awayForms = buildTeamForms(awayTeamName, awayArticle);

    // Determine total scores (including ET if applicable)
    const totalHome = homeScore + (etHomeScore || 0);
    const totalAway = awayScore + (etAwayScore || 0);

    // Determine winner/loser
    let winnerId = null;
    let loserId = null;
    let winnerForms = null;
    let loserForms = null;

    if (penaltyResult) {
        winnerId = penaltyResult.home > penaltyResult.away ? homeTeamId : awayTeamId;
        loserId = winnerId === homeTeamId ? awayTeamId : homeTeamId;
    } else if (totalHome !== totalAway) {
        winnerId = totalHome > totalAway ? homeTeamId : awayTeamId;
        loserId = winnerId === homeTeamId ? awayTeamId : homeTeamId;
    }

    if (winnerId) {
        winnerForms = winnerId === homeTeamId ? homeForms : awayForms;
        loserForms = loserId === homeTeamId ? homeForms : awayForms;
    }

    // Score string
    const scoreStr = `${totalHome}-${totalAway}`;
    const regularScoreStr = `${homeScore}-${awayScore}`;
    const goalDiff = Math.abs(totalHome - totalAway);
    const totalGoals = totalHome + totalAway;
    const isDraw = totalHome === totalAway && !penaltyResult;
    const isGoalless = totalGoals === 0;

    // Match patterns
    const isBlowout = goalDiff >= 3;
    const isNarrowWin = goalDiff === 1 && !isDraw;
    const isCup = competitionRole === 'domestic_cup' || competitionRole === 'european';
    const isHighStakes = isCup && knockoutRoundNumber && knockoutRoundNumber >= 5;
    const isChampion = tournamentResultType === 'champion';

    // Build replacements (longest keys first to prevent partial matches)
    const replacements = {
        ':del_winner': winnerForms?.del || '',
        ':del_loser': loserForms?.del || '',
        ':del_home': homeForms.del,
        ':del_away': awayForms.del,
        ':al_winner': winnerForms?.al || '',
        ':al_loser': loserForms?.al || '',
        ':al_home': homeForms.al,
        ':al_away': awayForms.al,
        ':el_winner': winnerForms?.el || '',
        ':el_loser': loserForms?.el || '',
        ':el_home': homeForms.el,
        ':el_away': awayForms.el,
        ':winner': winnerForms?.name || '',
        ':loser': loserForms?.name || '',
        ':home': homeForms.name,
        ':away': awayForms.name,
        ':score_regular': regularScoreStr,
        ':score': scoreStr,
        ':pen_score': penaltyResult ? `${penaltyResult.home}-${penaltyResult.away}` : '',
        ':goals_each': String(totalHome),
        ':venue': venueName || '',
        ':competition': competitionName || '',
    };

    const sentences = [];

    // -----------------------------------------------------------------
    // Step 1: Opening sentence
    // -----------------------------------------------------------------
    sentences.push(buildOpening(t, replacements, {
        isDraw, isGoalless, isBlowout, isNarrowWin,
        isCup, isKnockout, isHighStakes, isChampion,
        hasExtraTime, penaltyResult,
        winnerId, homeTeamId,
    }));

    // -----------------------------------------------------------------
    // Step 2: Goal narrative
    // -----------------------------------------------------------------
    if (!isGoalless) {
        const goalNarrative = buildGoalNarrative(t, replacements, {
            allEvents, homeTeamId, isDraw, totalGoals,
        });
        if (goalNarrative) sentences.push(goalNarrative);
    }

    // -----------------------------------------------------------------
    // Step 3: Key moments (comeback, red cards, half dominance)
    // -----------------------------------------------------------------
    const keyMoment = buildKeyMoment(t, replacements, {
        allEvents, homeTeamId, winnerId,
        totalHome, totalAway, isDraw,
        homeForms, awayForms,
    });
    if (keyMoment) sentences.push(keyMoment);

    // -----------------------------------------------------------------
    // Step 4: Game description (possession, shots, upsets)
    // -----------------------------------------------------------------
    const gameDesc = buildGameDescription(t, replacements, {
        allEvents, homeTeamId,
        homePossession, awayPossession,
        totalHome, totalAway, isDraw,
        winnerId,
        homeForms, awayForms,
    });
    if (gameDesc) sentences.push(gameDesc);

    // -----------------------------------------------------------------
    // Step 5: Form / streak (league only)
    // -----------------------------------------------------------------
    if (!isCup) {
        const formComment = buildFormComment(t, {
            homeForm, awayForm,
            homeForms, awayForms,
            homeTeamId, awayTeamId,
            winnerId, isDraw,
            totalHome, totalAway,
        });
        if (formComment) sentences.push(formComment);
    }

    // -----------------------------------------------------------------
    // Step 6: MVP closing (~70% of the time)
    // -----------------------------------------------------------------
    if (mvpPlayerName && t.summaryMvpClosing && Math.random() < 0.7) {
        sentences.push(pickTemplate(t.summaryMvpClosing, {
            ...replacements,
            ':player': mvpPlayerName,
        }));
    }

    return sentences.filter(Boolean).map(capitalizeFirst).join(' ');
}

// ---------------------------------------------------------------------------
// Sentence builders
// ---------------------------------------------------------------------------

function buildOpening(t, replacements, ctx) {
    const {
        isDraw, isGoalless, isBlowout, isNarrowWin,
        isCup, isKnockout, isHighStakes, isChampion,
        hasExtraTime, penaltyResult,
        winnerId, homeTeamId,
    } = ctx;

    // Priority 1: Penalty shootout decided
    if (penaltyResult) {
        return pickTemplate(t.summaryOpeningPenalties, replacements);
    }

    // Priority 2: Extra time decided
    if (hasExtraTime && winnerId) {
        return pickTemplate(t.summaryOpeningExtraTime, replacements);
    }

    // Priority 3: Champion (tournament final won)
    if (isChampion && t.summaryOpeningHighStakesChampion) {
        return pickTemplate(t.summaryOpeningHighStakesChampion, replacements);
    }

    // Priority 4: High-stakes win (semi/final)
    if (isHighStakes && winnerId && t.summaryOpeningHighStakesWin) {
        return pickTemplate(t.summaryOpeningHighStakesWin, replacements);
    }

    // Priority 5: Cup knockout win (non-high-stakes)
    if (isCup && isKnockout && winnerId && t.summaryOpeningCupWin) {
        return pickTemplate(t.summaryOpeningCupWin, replacements);
    }

    // Priority 6: Cup draw
    if (isCup && isDraw && t.summaryOpeningCupDraw) {
        return pickTemplate(t.summaryOpeningCupDraw, replacements);
    }

    // Priority 7: Goalless draw
    if (isGoalless) {
        return pickTemplate(t.summaryOpeningGoalless, replacements);
    }

    // Priority 8: Draw with goals
    if (isDraw) {
        return pickTemplate(t.summaryOpeningDraw, replacements);
    }

    // Priority 9: Blowout
    if (isBlowout) {
        return pickTemplate(t.summaryOpeningBlowout, replacements);
    }

    // Priority 10: Narrow win
    if (isNarrowWin) {
        return pickTemplate(t.summaryOpeningNarrowWin, replacements);
    }

    // Priority 11: Regular home/away win
    if (winnerId === homeTeamId) {
        return pickTemplate(t.summaryOpeningHomeWin, replacements);
    }
    return pickTemplate(t.summaryOpeningAwayWin, replacements);
}

function buildGoalNarrative(t, replacements, ctx) {
    const { allEvents, homeTeamId, isDraw, totalGoals } = ctx;

    // Extract actual goal events (not atmosphere/cosmetic ones)
    const goals = allEvents.filter(e => e.type === 'goal' || e.type === 'own_goal');
    if (goals.length === 0) return '';

    // For 1-1 draws, use the special draw scorer template
    if (isDraw && totalGoals === 2 && goals.length === 2 && t.summaryGoalsSingleScorerDraw) {
        const homeGoal = goals.find(e =>
            (e.type === 'goal' && e.teamId === homeTeamId) ||
            (e.type === 'own_goal' && e.teamId !== homeTeamId)
        );
        const awayGoal = goals.find(e =>
            (e.type === 'goal' && e.teamId !== homeTeamId) ||
            (e.type === 'own_goal' && e.teamId === homeTeamId)
        );
        if (homeGoal && awayGoal) {
            return pickTemplate(t.summaryGoalsSingleScorerDraw, {
                ...replacements,
                ':home_scorer': formatScorerName(homeGoal, t),
                ':away_scorer': formatScorerName(awayGoal, t),
            });
        }
    }

    // Single goal total
    if (goals.length === 1 && t.summaryGoalsSingleScorer) {
        return pickTemplate(t.summaryGoalsSingleScorer, {
            ...replacements,
            ':scorer': formatScorerName(goals[0], t),
        });
    }

    // Split goals by half
    const firstHalfGoals = goals.filter(e => e.minute <= 45);
    const secondHalfGoals = goals.filter(e => e.minute > 45);

    const firstHalfNames = firstHalfGoals.map(e => formatScorerName(e, t));
    const secondHalfNames = secondHalfGoals.map(e => formatScorerName(e, t));

    // All in first half
    if (secondHalfGoals.length === 0 && t.summaryGoalsFirstHalfOnly) {
        return pickTemplate(t.summaryGoalsFirstHalfOnly, {
            ...replacements,
            ':scorers': joinScorers(firstHalfNames),
        });
    }

    // All in second half
    if (firstHalfGoals.length === 0 && t.summaryGoalsSecondHalfOnly) {
        return pickTemplate(t.summaryGoalsSecondHalfOnly, {
            ...replacements,
            ':scorers': joinScorers(secondHalfNames),
        });
    }

    // Goals in both halves
    if (firstHalfGoals.length > 0 && secondHalfGoals.length > 0 && t.summaryGoalsBothHalves) {
        return pickTemplate(t.summaryGoalsBothHalves, {
            ...replacements,
            ':first_half_scorers': joinScorers(firstHalfNames),
            ':second_half_scorers': joinScorers(secondHalfNames),
        });
    }

    return '';
}

function buildKeyMoment(t, replacements, ctx) {
    const {
        allEvents, homeTeamId, winnerId,
        totalHome, totalAway, isDraw,
        homeForms, awayForms,
    } = ctx;

    // Detect comeback: team that conceded first wins
    if (winnerId && !isDraw) {
        const goals = allEvents.filter(e => e.type === 'goal' || e.type === 'own_goal');
        if (goals.length >= 2) {
            const firstGoal = goals.reduce((earliest, e) =>
                e.minute < earliest.minute ? e : earliest
            , goals[0]);

            // Who scored the first goal? (considering own goals)
            let firstScoringTeam;
            if (firstGoal.type === 'own_goal') {
                firstScoringTeam = firstGoal.teamId === homeTeamId ? awayForms : homeForms;
            } else {
                firstScoringTeam = firstGoal.teamId === homeTeamId ? homeForms : awayForms;
            }

            const winnerTeamForms = winnerId === homeTeamId ? homeForms : awayForms;
            if (firstScoringTeam.name !== winnerTeamForms.name && t.summaryComeback) {
                return pickTemplate(t.summaryComeback, replacements);
            }
        }
    }

    // Detect red cards
    const redCards = allEvents.filter(e => e.type === 'red_card');
    if (redCards.length > 0) {
        // Group by team
        const byTeam = {};
        for (const rc of redCards) {
            byTeam[rc.teamId] = byTeam[rc.teamId] || [];
            byTeam[rc.teamId].push(rc);
        }

        // Multiple reds on one team
        for (const [teamId, cards] of Object.entries(byTeam)) {
            if (cards.length >= 2 && t.summaryRedCardsMultiple) {
                const teamF = teamId === homeTeamId ? homeForms : awayForms;
                return pickTemplate(t.summaryRedCardsMultiple, {
                    ...replacements,
                    ':el_team': teamF.el,
                    ':del_team': teamF.del,
                    ':team': teamF.name,
                    ':count': String(cards.length),
                });
            }
        }

        // Single red card
        if (redCards.length === 1 && t.summaryRedCardSingle) {
            return pickTemplate(t.summaryRedCardSingle, {
                ...replacements,
                ':player': redCards[0].playerName || '?',
                ':minute': String(redCards[0].minute),
            });
        }
    }

    // Detect half dominance (all goals in one half, if 2+ goals total)
    if (totalHome + totalAway >= 2) {
        const goals = allEvents.filter(e => e.type === 'goal' || e.type === 'own_goal');
        const firstHalf = goals.filter(e => e.minute <= 45);
        const secondHalf = goals.filter(e => e.minute > 45);

        if (secondHalf.length === 0 && firstHalf.length >= 2 && t.summaryDominantFirstHalf) {
            return pickTemplate(t.summaryDominantFirstHalf, replacements);
        }
        if (firstHalf.length === 0 && secondHalf.length >= 2 && t.summaryDominantSecondHalf) {
            return pickTemplate(t.summaryDominantSecondHalf, replacements);
        }
    }

    return '';
}

function buildGameDescription(t, replacements, ctx) {
    const {
        allEvents, homeTeamId,
        homePossession, awayPossession,
        totalHome, totalAway, isDraw,
        winnerId,
        homeForms, awayForms,
    } = ctx;

    // Count shots from atmosphere events
    const homeShotsOn = allEvents.filter(e => e.type === 'shot_on_target' && e.teamId === homeTeamId).length;
    const awayShotsOn = allEvents.filter(e => e.type === 'shot_on_target' && e.teamId !== homeTeamId).length;
    const homeShotsOff = allEvents.filter(e => e.type === 'shot_off_target' && e.teamId === homeTeamId).length;
    const awayShotsOff = allEvents.filter(e => e.type === 'shot_off_target' && e.teamId !== homeTeamId).length;
    const homeShots = homeShotsOn + homeShotsOff;
    const awayShots = awayShotsOn + awayShotsOff;

    const winnerIsHome = winnerId === homeTeamId;
    const winnerPoss = winnerId ? (winnerIsHome ? homePossession : awayPossession) : 0;
    const loserPoss = winnerId ? (winnerIsHome ? awayPossession : homePossession) : 0;
    const winnerShots = winnerId ? (winnerIsHome ? homeShots : awayShots) : 0;
    const loserShots = winnerId ? (winnerIsHome ? awayShots : homeShots) : 0;

    const dominantForms = homePossession >= awayPossession ? homeForms : awayForms;
    const dominantPoss = Math.max(homePossession, awayPossession);

    const teamReplacements = {
        ...replacements,
        ':el_dominant': dominantForms.el,
        ':del_dominant': dominantForms.del,
        ':dominant': dominantForms.name,
        ':poss': String(Math.round(dominantPoss)),
        ':home_poss': String(Math.round(homePossession)),
        ':away_poss': String(Math.round(awayPossession)),
    };

    // Priority 1: Upset — team with much less possession wins decisively
    if (winnerId && !isDraw && winnerPoss < 40 && loserPoss >= 55 && t.summaryPossessionUpset) {
        return pickTemplate(t.summaryPossessionUpset, teamReplacements);
    }

    // Priority 2: Dominant possession but lost or drew
    if (!isDraw && winnerId && loserPoss >= 60 && t.summaryPossessionDominanceLost) {
        return pickTemplate(t.summaryPossessionDominanceLost, {
            ...teamReplacements,
            ':el_dominant': (winnerId === homeTeamId ? awayForms : homeForms).el,
            ':dominant': (winnerId === homeTeamId ? awayForms : homeForms).name,
            ':poss': String(Math.round(loserPoss)),
        });
    }

    // Priority 3: Draw with lopsided possession
    if (isDraw && dominantPoss >= 60 && t.summaryPossessionDominanceDraw) {
        return pickTemplate(t.summaryPossessionDominanceDraw, teamReplacements);
    }

    // Priority 4: Shot dominance — winner had way more shots (2x+)
    if (winnerId && !isDraw && winnerShots >= loserShots * 2 && winnerShots >= 4 && t.summaryShotDominance) {
        return pickTemplate(t.summaryShotDominance, teamReplacements);
    }

    // Priority 5: Smash and grab — winner had fewer shots
    if (winnerId && !isDraw && loserShots >= winnerShots * 2 && loserShots >= 4 && t.summaryShotUpset) {
        return pickTemplate(t.summaryShotUpset, teamReplacements);
    }

    // Priority 6: Even contest
    if (isDraw && Math.abs(homePossession - awayPossession) < 10 && t.summaryEvenContest) {
        return pickTemplate(t.summaryEvenContest, teamReplacements);
    }

    return '';
}

function buildFormComment(t, ctx) {
    const {
        homeForm, awayForm,
        homeForms, awayForms,
        homeTeamId, awayTeamId,
        winnerId, isDraw,
        totalHome, totalAway,
    } = ctx;

    if (!homeForm?.length && !awayForm?.length) return '';

    // Determine current match result for each team
    const homeResult = totalHome > totalAway ? 'W' : (totalHome < totalAway ? 'L' : 'D');
    const awayResult = totalAway > totalHome ? 'W' : (totalAway < totalHome ? 'L' : 'D');

    // Combine pre-match form + current result
    const homeFullForm = [...(homeForm || []), homeResult];
    const awayFullForm = [...(awayForm || []), awayResult];

    // Check losing streaks (prioritise the team that just lost)
    const teams = [
        { form: homeFullForm, teamForms: homeForms, result: homeResult, id: homeTeamId },
        { form: awayFullForm, teamForms: awayForms, result: awayResult, id: awayTeamId },
    ];

    for (const team of teams) {
        if (team.result === 'L') {
            const losses = countTrailingStreak(team.form, 'L');
            if (losses >= 3 && t.summaryFormLosingStreak) {
                return pickTemplate(t.summaryFormLosingStreak, {
                    ':el_team': team.teamForms.el,
                    ':del_team': team.teamForms.del,
                    ':team': team.teamForms.name,
                    ':count': String(losses),
                });
            }
        }
    }

    // Check winning streaks
    for (const team of teams) {
        if (team.result === 'W') {
            const wins = countTrailingStreak(team.form, 'W');
            if (wins >= 3 && t.summaryFormWinningStreak) {
                return pickTemplate(t.summaryFormWinningStreak, {
                    ':el_team': team.teamForms.el,
                    ':del_team': team.teamForms.del,
                    ':team': team.teamForms.name,
                    ':count': String(wins),
                });
            }
        }
    }

    // Check winless streaks (no W in trailing results)
    for (const team of teams) {
        if (team.result !== 'W') {
            let winless = 0;
            for (let i = team.form.length - 1; i >= 0; i--) {
                if (team.form[i] !== 'W') winless++;
                else break;
            }
            if (winless >= 3 && t.summaryFormWinless) {
                return pickTemplate(t.summaryFormWinless, {
                    ':el_team': team.teamForms.el,
                    ':del_team': team.teamForms.del,
                    ':team': team.teamForms.name,
                    ':count': String(winless),
                });
            }
        }
    }

    return '';
}
