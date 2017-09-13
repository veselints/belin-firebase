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
            key: 'development',
            name: 'Регионално и местно развитие'
        }, {
            key: 'planning',
            name: 'Пространствено планиране'
        }];

        var photosAreaOptions = [{
            key: 'dunav',
            name: 'Край Дунав'
        }, {
            key: 'blackSea',
            name: 'Черно море'
        }, {
            key: 'tracia',
            name: 'Тракия'
        }, {
            key: 'balkan',
            name: 'Балканът'
        }, {
            key: 'rilaRodophePirin',
            name: 'Рила, Родопи, Пирин'
        }, {
            key: 'southWestBg',
            name: 'Югозападна България'
        }, {
            key: 'europe',
            name: 'Европа'
        }, {
            key: 'asia',
            name: 'Азия'
        }, {
            key: 'africa',
            name: 'Африка'
        }, {
            key: 'america',
            name: 'Америка'
        }, {
            key: 'colages',
            name: 'Колажи'
        }];

        var presentationsAreaOptions = [{
            key: 'community',
            name: 'Работа със заинтересованите страни'
        }, {
            key: 'development',
            name: 'Регионално и местно развитие'
        }, {
            key: 'planning',
            name: 'Пространствено планиране'
        }, {
            key: 'regeneration',
            name: 'Градско възстановяване и развитие'
        }];

        var projectsAreaOptions = [{
            key: 'development',
            name: 'Регионално и местно развитие'
        }, {
            key: 'planning',
            name: 'Пространствено планиране'
        }, {
            key: 'regeneration',
            name: 'Градско възстановяване и развитие'
        }];

        var publicationsAreaOptions = [{
            key: 'community',
            name: 'Работа със заинтересованите страни'
        }, {
            key: 'development',
            name: 'Регионално и местно развитие'
        }, {
            key: 'planning',
            name: 'Пространствено планиране'
        }, {
            key: 'regeneration',
            name: 'Градско възстановяване и развитие'
        }];

        var allowedFiles = {
            imageJpg: 'image/jpeg',
            pdf: 'application/pdf',
            imagesAndPdf: 'image/jpeg,image/png,application/pdf'
        };

        return {
            areaCategories,
            archiveAreaOptions,
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