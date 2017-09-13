(function() {
    'use strict'

    function AdminCreateController($window, $location, $firebaseAuth, $firebaseStorage, $firebaseObject, $firebaseArray, adminOptionsService) {
        var vm = this;
        var auth = $firebaseAuth();
        var firebaseUser = auth.$getAuth();
        var paintingsKeysRef = firebase.database().ref('paintingsKeys/');

        var initialModel = {
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
            year: null,
            documents: {}
        };

        angular.extend(vm, {
            majorCategory: 'paintings',
            showAreas: true,
            areaOptions: $firebaseArray(paintingsKeysRef),
            showDescription: true,
            showYear: true,
            showForPublications: false,
            showFile: true,
            allowedFiles: adminOptionsService.allowedFiles.imageJpg,
            hideSubmit: false,
            model: initialModel,
            currentDocument: {
                key: null,
                title: null,
                file: null
            }
        });

        if (!firebaseUser) {
            $location.path('/admin/login');
        }

        vm.updateMajorSelection = function() {
            var selectedCategory = vm.majorCategory;

            vm.showDescription = true;
            vm.showYear = true;
            vm.showFile = true;
            vm.allowedFiles = adminOptionsService.allowedFiles.imageJpg;
            vm.showForPublications = false;
            vm.showDocuments = false;
            vm.hideSubmit = false;
            vm.showDocumentsForm = false;

            if (adminOptionsService.areaCategories.indexOf(selectedCategory) > -1) {
                var areaOptionsIdentifier = selectedCategory + 'AreaOptions';
                vm.showAreas = true;

                if (selectedCategory === 'paintings') {
                    vm.areaOptions = $firebaseArray(paintingsKeysRef);
                } else {
                    vm.areaOptions = adminOptionsService[areaOptionsIdentifier];
                }

                if (selectedCategory === 'photos') {
                    vm.showDescription = false;
                } else if (selectedCategory === 'publications') {
                    vm.showForPublications = true;
                    vm.showFile = false;
                    vm.showYear = false;
                } else if (selectedCategory === 'presentations') {
                    vm.allowedFiles = adminOptionsService.allowedFiles.pdf;
                } else if (selectedCategory === 'projects') {
                    vm.showDocuments = true;
                    vm.hideSubmit = true;
                } else if (selectedCategory === 'archive') {
                    vm.allowedFiles = adminOptionsService.allowedFiles.imagesAndPdf
                }
            } else {
                vm.showAreas = false;

                if (selectedCategory === 'blogposts') {
                    vm.showYear = false;
                    vm.showFile = false;
                    // The below may or may not change
                    vm.model.section = 'blogposts';
                } else {
                    vm.model.section = 'community';
                }
            }
        }

        vm.addDocumentForm = function() {
            if (vm.form.$valid) {
                vm.showDocumentsForm = true;
            } else {
                $window.alert("Попълнете данните за проекта преди да добавите документ!");
            }
        }

        vm.saveDocument = function() {
            if (!keyIsValid(vm.currentDocument.key)) {
                return;
            } else if (!vm.currentDocument.key || vm.currentDocument.key.length < 5) {
                $window.alert("Заглавието на документа следва да съдържа поне 5 букви!");
                return;
            } else if (!vm.currentDocument.file) {
                $window.alert("Изберете документен файл!");
                return;
            }

            var path = vm.majorCategory + '/' + vm.model.section + '/' + vm.key + '/documents/';
            uploadDocumentFile(path + vm.currentDocument.file.name);
        }

        vm.submitCreate = function() {
            if (vm.form.$valid && keyIsValid(vm.model.key)) {
                if (vm.showFile) {
                    if (vm.form.file.$valid &&
                        vm.file &&
                        vm.allowedFiles.indexOf(vm.file.type) > -1) {
                        var path = vm.majorCategory + '/' + vm.model.section + '/';
                        uploadFile(path + vm.file.name);
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

        function keyIsValid(key) {
            var re = /^\w+$/;

            if (!re.test(key)) {
                $window.alert("Ключът трябва да съдържа само букви, цифри и долно тире!");
                return false;
            } else {
                return true;
            }
        }

        function uploadDocumentFile(path) {
            var storageRef = firebase.storage().ref(path);
            var storage = $firebaseStorage(storageRef);
            var uploadTask = storage.$put(vm.currentDocument.file);

            uploadTask.$complete(function(snapshot) {
                vm.model.documents[vm.currentDocument.key] = {
                    title: vm.currentDocument.title,
                    fileName: vm.currentDocument.file.name,
                    url: snapshot.downloadURL
                };

                vm.currentDocument = {};
                vm.hideSubmit = false;

                $window.alert("Новият документ е качен!");
            });
        }

        function uploadFile(path) {
            var storageRef = firebase.storage().ref(path);
            var storage = $firebaseStorage(storageRef);
            var uploadTask = storage.$put(vm.file);

            uploadTask.$complete(function(snapshot) {
                vm.model.fileName = vm.file.name;
                saveNewEntry(snapshot);
            });
        }

        function saveNewEntry(snapshot) {
            var pathToDbRef = vm.majorCategory + '/' + vm.model.section + '/' + vm.model.key;
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
        .controller('AdminCreateController', ['$window', '$location', '$firebaseAuth', '$firebaseStorage', '$firebaseObject', '$firebaseArray', 'adminOptionsService', AdminCreateController]);
}());