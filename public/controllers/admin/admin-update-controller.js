(function() {
    'use strict'

    function AdminUpdateController($window, $location, $firebaseAuth, $firebaseStorage, $firebaseObject, $firebaseArray, adminOptionsService) {
        var vm = this;
        var auth = $firebaseAuth();
        var firebaseUser = auth.$getAuth();
        var paintingsKeysRef = firebase.database().ref('paintingsKeys/');
        
        var initialModel = {
            description: null,
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
        //var paintingsKeys = $firebaseArray(paintingsKeysRef);

        angular.extend(vm, {
            majorCategory: 'paintings',
            showAreas: true,
            areaOptions: $firebaseArray(paintingsKeysRef),
            showDescription: true,
            showYear: true,
            showForPublications: false,
            showSubmit: false,
            selectedForEditing: false,
            showListOfItemsToEdit: false,
            model: initialModel,
            showSearchButton: true,
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
            vm.showForPublications = false;
            vm.showDocuments = false;
            vm.showListOfItemsToEdit = false;
            vm.showSearchButton = true;
            vm.showSubmit = false;

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
                    vm.showYear = false;
                } else if (selectedCategory === 'projects') {
                    vm.showDocuments = true;
                }
            } else {
                vm.showAreas = false;

                if (selectedCategory === 'blogposts') {
                    vm.showYear = false;
                    // The below may or may not change
                    vm.model.section = 'blogposts';
                } else {
                    vm.model.section = 'community';
                }
            }
        }

        vm.updateMinorSelection = function() {
            vm.showListOfItemsToEdit = false;
            vm.showSearchButton = true;
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

            var path = vm.majorCategory + '/' + vm.model.section + '/' + vm.model.$id + '/documents/';
            uploadDocumentFile(path + vm.currentDocument.file.name);
        }

        vm.searchItems = function() {
            var pathToDbRef = vm.majorCategory + '/' + vm.model.section + '/';
            var dbRef = firebase.database().ref(pathToDbRef);
            vm.selectedArrayForEdit = $firebaseArray(dbRef);
            vm.showListOfItemsToEdit = true;
            vm.showSearchButton = false;
        }

        vm.editCurrent = function(index) {
            vm.currentIndex = index;
            vm.model = vm.selectedArrayForEdit[index];
            vm.showListOfItemsToEdit = false;
            vm.selectedForEditing = true;
            vm.showSubmit = true;
        }

        vm.submitUpdate = function() {
            vm.selectedArrayForEdit.$save(vm.currentIndex).then(function(ref) {
                vm.model = initialModel;
                vm.selectedForEditing = false;
                vm.showListOfItemsToEdit = true;
                vm.showSubmit = false;
                $window.alert("Oбектът беше коригиран успешно!");
            }, function(error) {
                console.log("Error:", error);
            });
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

                $window.alert("Новият документ е качен!");
            });
        }
    }

    angular.module('belinApp.controllers')
        .controller('AdminUpdateController', ['$window', '$location', '$firebaseAuth', '$firebaseStorage', '$firebaseObject', '$firebaseArray', 'adminOptionsService', AdminUpdateController]);
}());