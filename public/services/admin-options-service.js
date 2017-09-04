(function() {
    'use strict'

    function adminOptionsService() {
        var areaCategories = [
            'archive',
            'paintings',
            'photos',
            'presentations',
            'projects',
            'publications'
        ];

        var archiveAreaOptions = [{
            value: 'development',
            text: 'Регионално и местно развитие'
        }, {
            value: 'planning',
            text: 'Пространствено планиране'
        }];

        var paintingsAreaOptions = [{
            value: 'plovdiv',
            text: 'Пловдив'
        }, {
            value: 'monasteries',
            text: 'Манастири'
        }, {
            value: 'ruse',
            text: 'Русе'
        }, {
            value: 'drawings',
            text: 'Рисунки'
        }];

        var photosAreaOptions = [{
            value: 'dunav',
            text: 'Край Дунав'
        }, {
            value: 'blackSea',
            text: 'Черно море'
        }, {
            value: 'tracia',
            text: 'Тракия'
        }, {
            value: 'balkan',
            text: 'Балканът'
        }, {
            value: 'rilaRodophePirin',
            text: 'Рила, Родопи, Пирин'
        }, {
            value: 'southWestBg',
            text: 'Югозападна България'
        }, {
            value: 'europe',
            text: 'Европа'
        }, {
            value: 'asia',
            text: 'Азия'
        }, {
            value: 'africa',
            text: 'Африка'
        }, {
            value: 'america',
            text: 'Америка'
        }, {
            value: 'collages',
            text: 'Колажи'
        }];

        var presentationsAreaOptions = [{
            value: 'community',
            text: 'Работа със заинтересованите страни'
        }, {
            value: 'development',
            text: 'Регионално и местно развитие'
        }, {
            value: 'planning',
            text: 'Пространствено планиране'
        }, {
            value: 'regeneration',
            text: 'Градско възстановяване и развитие'
        }];

        var projectsAreaOptions = [{
            value: 'development',
            text: 'Регионално и местно развитие'
        }, {
            value: 'planning',
            text: 'Пространствено планиране'
        }, {
            value: 'regeneration',
            text: 'Градско възстановяване и развитие'
        }];

        var publicationsAreaOptions = [{
            value: 'community',
            text: 'Работа със заинтересованите страни'
        }, {
            value: 'development',
            text: 'Регионално и местно развитие'
        }, {
            value: 'planning',
            text: 'Пространствено планиране'
        }, {
            value: 'regeneration',
            text: 'Градско възстановяване и развитие'
        }];

        var allowedFiles = {
            imageJpg: 'image/jpeg',
            pdf: 'application/pdf',
            imagesAndPdf: 'image/jpeg,image/png,application/pdf'
        };

        return {
            areaCategories,
            archiveAreaOptions,
            paintingsAreaOptions,
            photosAreaOptions,
            presentationsAreaOptions,
            projectsAreaOptions,
            publicationsAreaOptions ,
            allowedFiles           
        };
    }

    angular.module('belinApp.services')
        .service('adminOptionsService', [adminOptionsService]);
}())