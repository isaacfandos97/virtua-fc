<?php

namespace App\Support\TeamColors;

final class PrimeraFederacionB implements TeamColorProvider
{
    public static function teams(): array
    {
        return [
            // TODO: assign real kit colors
            'Real Murcia CF' => [
                'pattern' => 'solid',
                'primary' => 'red-800',
                'secondary' => 'white',
                'number' => 'white',
            ],
            'Hércules CF' => [
                'pattern' => 'stripes',
                'primary' => 'blue-800',
                'secondary' => 'white',
                'number' => 'white',
            ],
            'Villarreal CF B' => [
                'pattern' => 'solid',
                'primary' => 'yellow-500',
                'secondary' => 'blue-600',
                'number' => 'blue-600',
            ],
            'FC Cartagena' => [
                'pattern' => 'stripes',
                'primary' => 'black',
                'secondary' => 'white',
                'number' => 'white',
            ],
            'Gimnàstic de Tarragona' => [
                'pattern' => 'solid',
                'primary' => 'red-600',
                'secondary' => 'white',
                'number' => 'white',
            ],
            'CE Sabadell FC' => [
                'pattern' => 'halves',
                'primary' => 'blue-600',
                'secondary' => 'white',
                'number' => 'black',
            ],
            'Marbella FC' => [
                'pattern' => 'solid',
                'primary' => 'white',
                'secondary' => 'blue-900',
                'number' => 'blue-900',
            ],
            'Sevilla Atlético' => [
                'pattern' => 'sash',
                'primary' => 'white',
                'secondary' => 'red-700',
                'number' => 'red-700',
            ],
            'Algeciras CF' => [
                'pattern' => 'stripes',
                'primary' => 'red-700',
                'secondary' => 'white',
                'number' => 'blue-700',
            ],
            'UD Ibiza' => [
                'pattern' => 'solid',
                'primary' => 'sky-400',
                'secondary' => 'white',
                'number' => 'white',
            ],
            'CD Eldense' => [
                'pattern' => 'halves',
                'primary' => 'blue-800',
                'secondary' => 'red-900',
                'number' => 'white',
            ],
            'AD Alcorcón' => [
                'pattern' => 'solid',
                'primary' => 'yellow-500',
                'secondary' => 'blue-800',
                'number' => 'blue-800',
            ],
            'Antequera CF' => [
                'pattern' => 'stripes',
                'primary' => 'white',
                'secondary' => 'green-700',
                'number' => 'black',
            ],
            'CD Teruel' => [
                'pattern' => 'solid',
                'primary' => 'red-700',
                'secondary' => 'blue-700',
                'number' => 'white',
            ],
            'Atlético Sanluqueño CF' => [
                'pattern' => 'stripes',
                'primary' => 'white',
                'secondary' => 'green-700',
                'number' => 'black',
            ],
            'CE Europa' => [
                'pattern' => 'bar',
                'primary' => 'white',
                'secondary' => 'blue-700',
                'number' => 'blue-700',
            ],
            'Atlético Madrileño' => [
                'pattern' => 'stripes',
                'primary' => 'red-600',
                'secondary' => 'white',
                'number' => 'blue-700',
            ],
            'Juventud Torremolinos CF' => [
                'pattern' => 'stripes',
                'primary' => 'green-600',
                'secondary' => 'white',
                'number' => 'black',
            ],
            'SD Tarazona' => [
                'pattern' => 'solid',
                'primary' => 'red-600',
                'secondary' => 'white',
                'number' => 'white',
            ],
            'Betis Deportivo Balompié' => [
                'pattern' => 'stripes',
                'primary' => 'green-600',
                'secondary' => 'white',
                'number' => 'white',
            ],
        ];
    }
}
