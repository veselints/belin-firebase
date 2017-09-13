(function() {
    'use strict'

    function AdminIndexingController($window, $location, $firebaseAuth, $firebaseStorage, $firebaseArray) {
        var vm = this;
        var auth = $firebaseAuth();
        var firebaseUser = auth.$getAuth();

        if (!firebaseUser) {
            $location.path('/admin/login');
        }

        vm.indexImages = function() {
            if (!vm.indexingPath || 
                vm.indexingPath.length < 7 || 
                vm.indexingPath[vm.indexingPath.length - 1] !== '/' ||
                vm.indexingPath.indexOf('/') === vm.indexingPath.length - 1) {
                $window.alert('Не е избран коректен път до снимки за индексиране!');
                return;
            }

            var itemsRef = firebase.database().ref(vm.indexingPath);
            var itemsList = $firebaseArray(itemsRef);

            itemsList.$loaded()
                .then(function(list) {
                    if (list.length === 0) {
                        $window.alert('Не са намерени снимки на посоченият път!');
                        return;
                    }
                    syncIndex(undefined, list);
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });
        };

        function syncIndex(counter, list) {
            if (counter === undefined) {
                counter = 0;
            }
            if (counter >= list.length) {
                return;
            }

            var itemStorageRef = firebase.storage().ref(vm.indexingPath + list[counter].fileName);
            var itemStorage = $firebaseStorage(itemStorageRef);

            itemStorage.$getDownloadURL().then(function(url) {
                console.log(url);
                list[counter].url = url;
                list.$save(counter);
                counter++;
                syncIndex(counter, list);
            });
        }
    }

    angular.module('belinApp.controllers')
        .controller('AdminIndexingController', ['$window', '$location', '$firebaseAuth', '$firebaseStorage', '$firebaseArray', AdminIndexingController]);
}());