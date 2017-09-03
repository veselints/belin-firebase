(function() {
    'use strict';

    function CommonController($location, $routeParams, $firebaseArray, navigationOptionsService) {
        var vm = this;
        var currentMainSection = $location.path().split('/')[1].toLowerCase();
        var currentSection = $routeParams.section.toLowerCase();
        var ref = firebase.database().ref(currentMainSection + '/' + currentSection);

        vm.sectionInBg = navigationOptionsService.params[currentMainSection][currentSection];
        vm.items = $firebaseArray(ref);

        vm.items.$loaded(function(items) {
            if (items && items.length > 0) {
                vm.hasItems = true;
            }
        });

        vm.loaDetails = function(id, index) {
            $location.path('/' + currentMainSection + '/' + currentSection + '/' + id);
        };

         vm.loadPhoto = function(id) {
            $location.path('/photo/' + vm.region + '/' + id);
        };
    }

    angular.module('belinApp.controllers')
        .controller('CommonController', ['$location', '$routeParams', '$firebaseArray', 'navigationOptionsService', CommonController]);
}());