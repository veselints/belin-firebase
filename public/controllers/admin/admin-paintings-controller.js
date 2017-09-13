(function() {
    'use strict'

    function AdminPaintingsController($window, $location, $firebaseAuth, $firebaseObject) {
        var vm = this;
        var auth = $firebaseAuth();
        var firebaseUser = auth.$getAuth();

        vm.model = {
            key: null,
            name: null
        };

        if (!firebaseUser) {
            $location.path('/admin/login');
        }

        vm.saveNewPaintingsSection = function() {
            if (form.$valid) {
                var pathToDbRef = 'paintingsKeys/' + vm.model.key;
                var dbRef = firebase.database().ref(pathToDbRef);
                var newObject = $firebaseObject(dbRef);

                angular.extend(newObject, vm.model);

                newObject.$save().then(function(ref) {
                    $window.alert("Новата секция в Рисунки е запазена успешно!");
                }, function(error) {
                    console.log("Error:", error);
                });
            } else {
                $window.alert("Секцията в Рисунки трябва да има ключ и име! Всяко от тези полета трябва да е от поне 3 букви.");
            }
        }
    }

    angular.module('belinApp.controllers')
        .controller('AdminPaintingsController', ['$window', '$location', '$firebaseAuth', '$firebaseObject', AdminPaintingsController]);
}());