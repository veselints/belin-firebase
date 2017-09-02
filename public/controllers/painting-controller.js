(function() {
    'use strict';

    function PaintingController($location, $routeParams, $firebaseObject) {
        var vm = this;
        var currentRegion = $routeParams.region.toLowerCase();
        var id = $routeParams.paintingId;

        var paintingRef = firebase.database().ref('paintings/' + currentRegion + '/' + id);
        vm.painting = $firebaseObject(paintingRef);
    }

    angular.module('belinApp.controllers')
        .controller('PaintingController', ['$location', '$routeParams', '$firebaseObject', PaintingController]);
}());