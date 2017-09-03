(function() {
    'use strict'

    function navigationOptionsService() {
        var params = {
            archive: {
                development: 'Министрерство на регионалното развитие и благоустройството 1991 - 2010 г.',
                planning: 'Софпроект - Генерален план на София 1970 - 1990 г.'
            },
            forums: {
                community: 'Обществени форуми'
            },
            paintings: {
                ruse: 'Русе',
                monasteries: 'Манастири',
                plovdiv: 'Пловдив',
                drawings: 'Рисунки'
            },
            photos: {
                danube: 'Край Дунав',
                blacksea: 'Черно море',
                tracia: 'Тракия',
                balkan: 'Балканът',
                mountains: 'Рила, Пирин, Родопи',
                southwestbg: 'Югозападна България',
                europe: 'Европа',
                asia: 'Азия',
                america: 'Америка',
                africa: 'Африка',
                colages: 'Колажи'
            },
            presentations: {
                development: 'регионалното и местното развитие',
                planning: 'пространственото планиране',
                community: 'работата със заинтересованите страни',
                regeneration: 'градското възстановяване и развитие'
            },
            projects: {
                development: 'регионалното и местното развитие',
                planning: 'пространственото планиране',
                regeneration: 'градското възстановяване и развитие'
            },
            publications: {
                development: 'регионалното и местното развитие',
                planning: 'пространственото планиране',
                community: 'работата със заинтересованите страни',
                regeneration: 'градското възстановяване и развитие'
            },
            regeneration: {
                regeneration: 'Регенерация'
            },
            trainings: {
                community: 'Обучения'
            }
        };
        
        return {
            params
        };
    }

    angular.module('belinApp.services')
        .service('navigationOptionsService', [navigationOptionsService]);
}())