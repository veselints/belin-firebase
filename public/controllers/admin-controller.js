(function() {
    'use strict'

    function AdminController($window, $firebaseAuth, $firebaseStorage, $firebaseObject, $firebaseArray, adminOptionsService) {
        var vm = this;
        var auth = $firebaseAuth();
        var firebaseUser = auth.$getAuth();

        angular.extend(vm, {
            showAreas: true,
            areaOptions: adminOptionsService.paintingsAreaOptions,
            showDescription: true,
            showYear: true,
            showForPublications: false,
            majorCategory: 'paintings',
            showFile: true,
            authenticated: false,
            model: {
                area: 'ruse',
                title: null,
                year: null,
                url: null,
                date: null,
                colaborators: null,
                interviewer: null
            }
        });

        if (firebaseUser) {
            vm.authenticated = true;
        } else {
            vm.authenticated = false;
        }

        vm.indexImages = function() {
            return;

            var itemsRef = firebase.database().ref('paintings/plovdiv');
            var itemsList = $firebaseArray(itemsRef);

            itemsList.$loaded()
                .then(function(list) {
                    syncIndex(undefined, list);
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });
        };

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
                $window.alert(error.message);
            });
        }

        vm.updateMajorSelection = function() {
            var selectedCategory = vm.majorCategory;

            vm.showDescription = true;
            vm.showYear = true;
            vm.showForPublications = false;

            if (adminOptionsService.areaCategories.indexOf(selectedCategory) > -1) {
                vm.showAreas = true;
                vm.showFile = true;

                if (selectedCategory === 'photos') {
                    vm.areaOptions = adminOptionsService.photosAreaOptions;
                    vm.showDescription = false;
                } else if (selectedCategory === 'paintings') {
                    vm.areaOptions = adminOptionsService.paintingsAreaOptions;
                } else if (selectedCategory === 'archives') {
                    vm.areaOptions = adminOptionsService.archiveAreaOptions;
                } else if (selectedCategory === 'projects') {
                    vm.areaOptions = adminOptionsService.projectsAreaOptions;
                } else {
                    vm.areaOptions = adminOptionsService.professionalAreaOptions;

                    if (selectedCategory === 'publications') {
                        vm.showForPublications = true;
                        vm.showFile = false;
                    }
                }
            } else {
                if (adminOptionsService.noYearCategories.indexOf(selectedCategory) > -1) {
                    vm.showYear = false;
                }

                vm.showAreas = false;
                vm.showFile = false;
            }
        }

        vm.submit = function() {
            if (vm.form.$valid) {
                if (vm.showFile) {
                    if (vm.form.file.$valid && vm.file && vm.file.type === 'image/jpeg') {
                        uploadFile();
                    } else {
                        $window.alert('Файлът не е валиден!');
                    }
                } else {
                    saveNewEntry();
                }
            } else {
                $window.alert("Формата не е попълнена коректно!");
            }
        }

        function syncIndex(counter, list) {
            if (counter === undefined) {
                counter = 0;
            }
            if (counter >= list.length) {
                return;
            }

            var itemStorageRef = firebase.storage().ref("paintings/plovdiv/" + list[counter].url);
            var itemStorage = $firebaseStorage(itemStorageRef);

            itemStorage.$getDownloadURL().then(function(url) {
                console.log(url);
                list[counter].url = url;
                list.$save(counter);
                counter++;
                syncIndex(counter, list);
            });
        }

        function uploadFile() {
            var path = vm.majorCategory + '/';
            if (vm.showAreas) {
                path = path + vm.model.area + '/';
            }

            var storageRef = firebase.storage().ref(path + vm.file.name);
            var storage = $firebaseStorage(storageRef);
            var uploadTask = storage.$put(vm.file, { contentType: 'image/jpeg' });

            uploadTask.$complete(function(snapshot) {
                saveNewEntry(snapshot)
            });
        }

        function saveNewEntry(snapshot) {
            var pathToDbRef = vm.majorCategory + '/';
            if (vm.showAreas) {
                pathToDbRef = pathToDbRef + vm.model.area + '/';
            }

            pathToDbRef += vm.model.title;

            var dbRef = firebase.database().ref(pathToDbRef);
            var newObject = $firebaseObject(dbRef);
            angular.extend(newObject, vm.model);

            if (snapshot) {
                newObject.url = snapshot.downloadURL;
            }

            newObject.$save().then(function(ref) {
                $window.alert("Новият обект е запазен успешно!");
            }, function(error) {
                console.log("Error:", error);
            });
        }
    }

    angular.module('belinApp.controllers')
        .controller('AdminController', ['$window', '$firebaseAuth', '$firebaseStorage', '$firebaseObject', '$firebaseArray', 'adminOptionsService', AdminController]);
}());