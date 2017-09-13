(function() {
    'use strict'

    function AdminLoginController($window, $firebaseAuth) {
        var vm = this;
        var auth = $firebaseAuth();
        var firebaseUser = auth.$getAuth();

        if (firebaseUser) {
            vm.authenticated = true;
        } else {
            vm.authenticated = false;
        }

        vm.onAuthenticate = function() {
            if (vm.authEmail && vm.authEmail.length > 5 && vm.authPass && vm.authPass.length > 6) {
                auth.$signInWithEmailAndPassword(vm.authEmail, vm.authPass).then(function(user) {
                    if (user) {
                        $window.alert(user.email + ' Успешно влязохте в профила си!');
                        vm.authenticated = true;
                    } else {
                        user = {};
                        vm.authenticated = false;
                    }
                }).catch(function(error) {
                    console.log("Authentication failed:", error);
                });
            } else {
                $window.alert('Използвайте валиден Email и парола!');
            }
        }

        vm.onSignOut = function() {
            auth.$signOut().then(function() {
                $window.alert('Успешно излязохте от профила си!');
                vm.authenticated = false;
            }).catch(function(error) {
                console.log("Authentication failed:", error);
            });
        }
    }

    angular.module('belinApp.controllers')
        .controller('AdminLoginController', ['$window', '$firebaseAuth', AdminLoginController]);
}());