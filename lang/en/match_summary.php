<?php

return [
    // =========================================================================
    // Opening sentences — League
    // =========================================================================
    'opening_home_win' => [
        ':home win at :venue against :away (:score).',
        'Victory for :home at :venue against :away (:score).',
        ':home prevail at :venue against :away (:score).',
    ],
    'opening_away_win' => [
        ':away win at :venue and take the three points (:score).',
        'Away victory for :away against :home (:score).',
        ':away prevail at :venue against :home (:score).',
    ],
    'opening_blowout' => [
        ':winner demolish :loser at :venue (:score).',
        'Emphatic win for :winner against :loser at :venue (:score).',
        ':winner thrash :loser at :venue (:score).',
    ],
    'opening_draw' => [
        ':goals_each-all draw at :venue between :home and :away.',
        'Full time at :venue! :home :score :away.',
        'Points shared at :venue between :home and :away (:score).',
    ],
    'opening_goalless' => [
        'No goals at :venue between :home and :away (0-0).',
        'Goalless draw at :venue. Neither :home nor :away manage to find the net.',
        'Stalemate at :venue. :home and :away share a point.',
    ],
    'opening_narrow_win' => [
        ':winner edge it at :venue against :loser (:score).',
        'Tight win for :winner against :loser at :venue (:score).',
        ':winner grind out a win at :venue against :loser (:score).',
    ],

    // =========================================================================
    // Opening sentences — Extra time & penalties (knockout)
    // =========================================================================
    'opening_extra_time' => [
        ':winner win in extra time at :venue (:score).',
        'It took extra time, but :winner prevail at :venue (:score).',
    ],
    'opening_penalties' => [
        ':winner go through on penalties (:pen_score) after drawing :score_regular.',
        'Penalties decide it at :venue. :winner go through (:pen_score).',
    ],

    // =========================================================================
    // Opening sentences — Cup-specific
    // =========================================================================
    'opening_cup_win' => [
        ':winner advance in the :competition after beating :loser at :venue (:score).',
        ':winner go through at :venue against :loser (:score).',
        ':loser are knocked out at :venue. :winner progress (:score).',
    ],
    'opening_cup_draw' => [
        'Draw at :venue between :home and :away (:score) in the :competition.',
        ':home and :away share the spoils (:score) at :venue in the :competition.',
    ],

    // =========================================================================
    // Opening sentences — High stakes (semifinals, finals)
    // =========================================================================
    'opening_high_stakes_win' => [
        ':winner triumph at :venue and advance in the :competition! (:score)',
        'Huge win for :winner against :loser at :venue! (:score)',
        ':winner do it! Victory at :venue against :loser (:score).',
    ],
    'opening_high_stakes_champion' => [
        ':winner are :competition champions! Final won at :venue against :loser (:score).',
        ':winner lift the :competition trophy after beating :loser in the final (:score)!',
        'The :competition belongs to :winner! Final settled at :venue against :loser (:score).',
    ],

    // =========================================================================
    // Goal narrative
    // =========================================================================
    'goals_first_half_only' => [
        'The goals came in the first half courtesy of :scorers.',
        ':scorers scored in the first half.',
    ],
    'goals_second_half_only' => [
        'The goals came in the second half courtesy of :scorers.',
        ':scorers scored in the second half to decide the match.',
    ],
    'goals_both_halves' => [
        ':first_half_scorers in the first half, and :second_half_scorers in the second.',
        ':first_half_scorers opened the scoring, and :second_half_scorers sealed it in the second half.',
    ],
    'goals_single_scorer' => [
        ':scorer\'s goal decided the match.',
        'The only goal came from :scorer.',
        ':scorer scored the only goal of the game.',
    ],
    'goals_single_scorer_draw' => [
        'Goals from :home_scorer and :away_scorer.',
        ':home_scorer and :away_scorer got on the scoresheet.',
    ],

    // =========================================================================
    // Key moments
    // =========================================================================
    'comeback' => [
        ':winner came from behind to win the match.',
        'A comeback from :winner, who responded after falling behind.',
        ':winner turned the game around to claim victory.',
    ],
    'red_card_single' => [
        'The sending off of :player (:minute\') was a turning point.',
        'The match changed with the red card to :player on :minute minutes.',
    ],
    'red_cards_multiple' => [
        'The sending offs for :team shaped the outcome.',
        ':team were reduced after :count red cards.',
    ],
    'dominant_first_half' => [
        'All the goals came in the first half.',
        'An intense first half produced all the goals.',
    ],
    'dominant_second_half' => [
        'The second half was the more productive.',
        'The goals all came in the second period.',
    ],

    // =========================================================================
    // Form / streak (league only)
    // =========================================================================
    'form_losing_streak' => [
        ':team are sinking in the table with :count defeats in a row.',
        ':team\'s struggles continue with :count consecutive losses.',
        'Crisis for :team, who have now lost :count in a row.',
    ],
    'form_winning_streak' => [
        ':team are unstoppable with :count wins in a row.',
        'Superb run for :team, who make it :count consecutive victories.',
        ':team keep winning, :count in a row now.',
    ],
    'form_winless' => [
        ':team remain winless, :count matches without a victory now.',
        ':team can\'t find a win, :count games without one.',
    ],

    // =========================================================================
    // Game description (possession, shots, character)
    // =========================================================================
    'possession_upset' => [
        'Despite having only :poss% possession, :winner took their chances ruthlessly.',
        ':winner won without needing the ball, managing just :poss% possession.',
        'Clinical from :winner, who claimed victory with only :poss% possession.',
    ],
    'possession_dominance_lost' => [
        ':dominant had the ball (:poss%) but couldn\'t turn it into a win.',
        ':poss% possession for :dominant counted for nothing in the end.',
        ':dominant dominated possession (:poss%) but left empty-handed.',
    ],
    'possession_dominance_draw' => [
        ':dominant monopolised the ball (:poss%) but couldn\'t break the deadlock.',
        'Despite :poss% possession for :dominant, the scoreline didn\'t shift in their favour.',
    ],
    'shot_dominance' => [
        ':winner were far superior in chances created and deserved the win.',
        'Clear dominance from :winner, who created far more chances than their opponent.',
    ],
    'shot_upset' => [
        ':loser created more chances but :winner were more clinical.',
        'Against the run of play, :winner took the win despite creating fewer opportunities.',
    ],
    'even_contest' => [
        'An evenly matched contest from start to finish.',
        'A balanced affair with possession evenly shared between both sides.',
    ],

    // =========================================================================
    // Annotations
    // =========================================================================
    'penalty_goal_note' => 'pen.',
    'own_goal_note' => 'o.g.',

    // =========================================================================
    // MVP closing
    // =========================================================================
    'mvp_closing' => [
        ':player named MVP of the match.',
        ':player takes home the MVP award.',
        ':player voted the best player on the pitch.',
        'MVP: :player.',
    ],
];
