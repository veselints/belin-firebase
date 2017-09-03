(function() {
    'use strict';

    function CommonDetailsController($location, $routeParams, $firebaseObject, navigationOptionsService) {
        var vm = this;
        var currentMainSection = $location.path().split('/')[1].toLowerCase();
        var currentSection = $routeParams.section.toLowerCase();
        var id = $routeParams.id;
        var ref = firebase.database().ref(currentMainSection + '/' + currentSection + '/' + id);
        //debugger;
        vm.sectionInBg = navigationOptionsService.params[currentMainSection][currentSection];
        vm.item = $firebaseObject(ref);

        vm.item.$loaded(function(item) {
            //debugger;
        });
    }

    angular.module('belinApp.controllers')
        .controller('CommonDetailsController', ['$location', '$routeParams', '$firebaseObject', 'navigationOptionsService', CommonDetailsController]);
}());
