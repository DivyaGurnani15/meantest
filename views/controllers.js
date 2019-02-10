(function () {
    'use strict';
    var myApp = angular.module('app');
    myApp.controller('UploadController', function ($scope, fileUploadService,$http) {
        $scope.deleteId;
        $scope.uploadFile = function () {
            var ext = $scope.myFile.name.match(/\.(.+)$/)[1];
            if(angular.lowercase(ext) ==='jpg' || angular.lowercase(ext) ==='jpeg' || angular.lowercase(ext) ==='png'){
                    var file = $scope.myFile;
                    var uploadUrl = "/upload", 
                        promise = fileUploadService.uploadFileToUrl(file, uploadUrl);
         
                    promise.then(function (response) {
                        $scope.serverResponse = response.data;
                        alert($scope.serverResponse.data)
                        $scope.file = '';
                        $scope.listOfImages();
                    }, function () {
                        $scope.serverResponse = 'An error has occurred';
                        alert($scope.serverResponse)
                    })
                
            }  
            else{
                alert("Invalid File Format");
            }   
        }

        $scope.listOfImages = function () {
            $scope.imageListArray;
            $http.get('/getListOfImages')
                .then(function(response) {
                    if(response.data.data.length){
                        $scope.imageListArray = response.data.data; 
                    }else{
                        $scope.imageListArray = [];
                    }
                });
        }

        $scope.deleteFile = function (id) {
            $scope.deleteId = id;
        }

        $scope.deleteConfirmFile = function () {
            let obj = { _id : $scope.deleteId }
            $http.post('/deleteImage',obj,)
                .then(function(response) {
                    if(response.data.status == 200){
                        $('#deleteModal').modal('hide');
                        $scope.listOfImages();
                    }
                });
        }

    });
 
})();