<?php

return [
    // =========================================================================
    // Opening sentences — League
    // =========================================================================
    'opening_home_win' => [
        ':el_home gana en :venue frente :al_away (:score).',
        'Victoria :del_home en :venue frente :al_away (:score).',
        ':el_home se impone en :venue ante :el_away (:score).',
    ],
    'opening_away_win' => [
        ':el_away gana en :venue y se lleva los tres puntos (:score).',
        'Victoria :del_away como visitante frente :al_home (:score).',
        ':el_away se impone en :venue ante :el_home (:score).',
    ],
    'opening_blowout' => [
        ':el_winner arrolla :al_loser en :venue (:score).',
        'Goleada :del_winner en :venue frente :al_loser (:score).',
        'Paliza :del_winner :al_loser en :venue (:score).',
    ],
    'opening_draw' => [
        'Empate a :goals_each en :venue entre :el_home y :el_away.',
        '¡Final en :venue! :el_home :score :el_away.',
        'Reparto de puntos en :venue entre :el_home y :el_away (:score).',
    ],
    'opening_goalless' => [
        'Sin goles en :venue entre :el_home y :el_away (0-0).',
        'Empate sin goles en :venue. Ni :el_home ni :el_away logran marcar.',
        'A cero en :venue. :el_home y :el_away se reparten un punto.',
    ],
    'opening_narrow_win' => [
        ':el_winner se lleva la victoria por la mínima en :venue (:score).',
        'Triunfo ajustado :del_winner frente :al_loser en :venue (:score).',
        ':el_winner sufre pero gana en :venue frente :al_loser (:score).',
    ],

    // =========================================================================
    // Opening sentences — Extra time & penalties (knockout)
    // =========================================================================
    'opening_extra_time' => [
        ':el_winner se impone en la prórroga en :venue (:score).',
        'Necesitó la prórroga, pero :el_winner se lleva la victoria en :venue (:score).',
    ],
    'opening_penalties' => [
        ':el_winner se clasifica en la tanda de penaltis (:pen_score) tras empatar :score_regular.',
        'Los penaltis deciden en :venue. :el_winner se clasifica (:pen_score).',
    ],

    // =========================================================================
    // Opening sentences — Cup-specific
    // =========================================================================
    'opening_cup_win' => [
        ':el_winner avanza en la :competition tras imponerse :al_loser en :venue (:score).',
        ':el_winner se clasifica en :venue frente :al_loser (:score).',
        ':el_loser queda eliminado en :venue. :el_winner pasa de ronda (:score).',
    ],
    'opening_cup_draw' => [
        'Empate en :venue entre :el_home y :el_away (:score) en la :competition.',
        ':el_home y :el_away empatan (:score) en :venue por la :competition.',
    ],

    // =========================================================================
    // Opening sentences — High stakes (semifinals, finals)
    // =========================================================================
    'opening_high_stakes_win' => [
        '¡:el_winner se impone en :venue y avanza en la :competition! (:score)',
        '¡Enorme victoria :del_winner frente :al_loser en :venue! (:score)',
        '¡:el_winner lo consigue! Victoria en :venue frente :al_loser (:score).',
    ],
    'opening_high_stakes_champion' => [
        '¡:el_winner es campeón de la :competition! Victoria en la final en :venue frente :al_loser (:score).',
        '¡:el_winner levanta el título de la :competition tras imponerse en la final :al_loser (:score)!',
        '¡La :competition es :del_winner! Final resuelta en :venue frente :al_loser (:score).',
    ],

    // =========================================================================
    // Goal narrative
    // =========================================================================
    'goals_first_half_only' => [
        'Los goles llegaron en la primera mitad gracias a :scorers.',
        ':scorers marcaron en la primera parte.',
    ],
    'goals_second_half_only' => [
        'Los goles llegaron en la segunda mitad gracias a :scorers.',
        ':scorers marcaron en la segunda parte para decidir el encuentro.',
    ],
    'goals_both_halves' => [
        ':first_half_scorers en la primera parte, y :second_half_scorers en la segunda.',
        ':first_half_scorers abrieron la lata, y :second_half_scorers sentenciaron en el segundo tiempo.',
    ],
    'goals_single_scorer' => [
        'Gol de :scorer para decidir el encuentro.',
        'El tanto de :scorer decidió el partido.',
        ':scorer fue el autor del único gol.',
    ],
    'goals_single_scorer_draw' => [
        'Con los tantos de :home_scorer y :away_scorer.',
        ':home_scorer y :away_scorer firmaron los goles del empate.',
    ],

    // =========================================================================
    // Key moments
    // =========================================================================
    'comeback' => [
        ':el_winner remontó el partido tras ir por debajo en el marcador.',
        'Remontada :del_winner, que supo reponerse tras encajar primero.',
        ':el_winner dio la vuelta al marcador para llevarse la victoria.',
    ],
    'red_card_single' => [
        'La expulsión de :player (:minute\') marcó el devenir del encuentro.',
        'El partido cambió con la roja a :player en el minuto :minute.',
    ],
    'red_cards_multiple' => [
        'Las expulsiones en :el_team condicionaron el resultado.',
        ':el_team se quedó con inferioridad numérica tras :count expulsiones.',
    ],
    'dominant_first_half' => [
        'Los goles se concentraron en la primera mitad.',
        'Primera parte intensa con todos los goles del encuentro.',
    ],
    'dominant_second_half' => [
        'La segunda parte fue la más productiva.',
        'Los goles llegaron en el segundo tiempo.',
    ],

    // =========================================================================
    // Form / streak (league only)
    // =========================================================================
    'form_losing_streak' => [
        ':el_team se hunde en la clasificación y encadena :count derrotas consecutivas.',
        ':el_team sigue sin conocer el triunfo, con :count derrotas seguidas.',
        'Crisis en :el_team, que suma :count derrotas consecutivas.',
    ],
    'form_winning_streak' => [
        ':el_team sigue imparable y encadena :count victorias consecutivas.',
        'Racha espectacular :del_team, que suma :count triunfos seguidos.',
        ':el_team no para de ganar, ya van :count victorias seguidas.',
    ],
    'form_winless' => [
        ':el_team sigue sin ganar, ya van :count partidos sin victoria.',
        ':el_team no levanta cabeza, acumula :count encuentros sin ganar.',
    ],

    // =========================================================================
    // Annotations
    // =========================================================================
    'penalty_goal_note' => 'de penalti',
    'own_goal_note' => 'en propia puerta',

    // =========================================================================
    // MVP closing
    // =========================================================================
    'mvp_closing' => [
        ':player, nombrado MVP del partido.',
        'Además, :player se lleva el MVP del encuentro.',
        ':player, elegido como el mejor del partido.',
        'MVP del partido: :player.',
    ],
];
