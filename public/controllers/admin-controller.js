(function() {
    'use strict'

    function AdminController($window, $firebaseAuth, $firebaseStorage, $firebaseObject, $firebaseArray, adminOptionsService) {
        var vm = this;
        var auth = $firebaseAuth();
        var firebaseUser = auth.$getAuth();

        angular.extend(vm, {
            majorCategory: 'paintings',
            showAreas: true,
            areaOptions: adminOptionsService.paintingsAreaOptions,
            showDescription: true,
            showYear: true,
            showForPublications: false,
            showFile: true,
            allowedFiles: adminOptionsService.allowedFiles.imageJpg,
            authenticated: false,
            model: {
                abstract: null,
                section: 'ruse',
                colaborators: null,
                date: null,
                fileName: null,
                interviewer: null,
                key: null,
                orderId: 0,
                title: null,
                url: null,
                year: null
            }
        });

        if (firebaseUser) {
            vm.authenticated = true;
        } else {
            vm.authenticated = false;
        }

        vm.indexImages = function() {
            if (!vm.indexingPath) {
                $window.alert('Не е избран път до снимки за индексиране!');
                return;
            }

            var itemsRef = firebase.database().ref(vm.indexingPath);
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
            vm.showFile = true;
            vm.allowedFiles = adminOptionsService.allowedFiles.imageJpg;
            vm.showForPublications = false;
            vm.showDocuments = false;

            if (adminOptionsService.areaCategories.indexOf(selectedCategory) > -1) {
                var areaOptionsIdentifier = selectedCategory + 'AreaOptions';
                vm.showAreas = true;
                vm.areaOptions = adminOptionsService[areaOptionsIdentifier];

                if (selectedCategory === 'photos') {
                    vm.showDescription = false;
                } else if (selectedCategory === 'publications') {
                    vm.showForPublications = true;
                    vm.showFile = false;
                    vm.showYear = false;
                } else if (selectedCategory === 'presentations') {
                    vm.allowedFiles = adminOptionsService.allowedFiles.pdf;
                }else if (selectedCategory === 'projects') {
                    vm.showDocuments = true;
                }
            } else {
                vm.showAreas = false;

                if (selectedCategory === 'blogposts') {
                    vm.showYear = false;
                    vm.showFile = false;
                } else if (selectedCategory === 'archive') {
                    vm.allowedFiles = adminOptionsService.allowedFiles.imagesAndPdf
                }
            }
        }

        vm.submit = function() {
            if (vm.form.$valid && keyIsValid()) {
                if (vm.showFile) {
                    if (vm.form.file.$valid && 
                            vm.file && 
                            vm.allowedFiles.indexOf(vm.file.type) > -1) {
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

        function keyIsValid() {
            var key = vm.model.key;
            var re = /^\w+$/;

            if (!re.test(key)) {
                $window.alert("Ключът трябва да съдържа само букви, цифри и долно тире!");
                return false;
            } else {
                return true;
            }
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
                vm.model.fileName = vm.file.name;
                saveNewEntry(snapshot);
            });
        }

        function saveNewEntry(snapshot) {
            var pathToDbRef = vm.majorCategory + '/';
            if (vm.showAreas) {
                pathToDbRef = pathToDbRef + vm.model.area + '/';
            }

            pathToDbRef += vm.model.key;

            var dbRef = firebase.database().ref(pathToDbRef);
            var newObject = $firebaseObject(dbRef);
            angular.extend(newObject, vm.model);
            newObject.key = null;

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