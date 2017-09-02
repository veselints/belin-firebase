(function() {
    'use strict';

    var params = {
        ruse: 'Русе',
        monasteries: 'Манастири',
        plovdiv: 'Пловдив'
    };

    function PaintingsController($location, $routeParams, $firebaseArray) {
        var vm = this;
        var currentRegion = $routeParams.region.toLowerCase();
        vm.region = currentRegion;
        vm.regionInBg = params[currentRegion];

        var paintingsRef = firebase.database().ref('paintings/' + currentRegion);
        vm.paintings = $firebaseArray(paintingsRef);

        vm.loadPainting = function(id, index) {
            var currentPainting = vm.paintings[index];

            $location.path('/paintings/' + vm.region + '/' + id);
        };
    }

    angular.module('belinApp.controllers')
        .controller('PaintingsController', ['$location', '$routeParams', '$firebaseArray', PaintingsController]);
}());