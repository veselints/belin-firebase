(function() {
    'use strict';

    var params = {
        development: 'регионалното и местното развитие',
        planning: 'пространственото планиране',
        community: 'работата със заинтересованите страни',
        regeneration: 'градското възстановяване и развитие'
    };

    function PublictionsController($routeParams, $firebaseArray) {
        var vm = this;
        var currentSection = $routeParams.section;
        vm.section = currentSection;
        vm.sectionInBg = params[currentSection];

        var publicationsRef = firebase.database().ref('publications/' + currentSection);
        vm.publications = $firebaseArray(publicationsRef);
    }

    angular.module('belinApp.controllers')
        .controller('PublictionsController', ['$routeParams', '$firebaseArray', PublictionsController]);
}());
