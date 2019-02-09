(function () {
    'use strict';
    var myApp = angular.module('app');
    myApp.controller('UploadController', function ($scope, fileUploadService) {
 
        $scope.uploadFile = function () {
            var ext = $scope.myFile.name.match(/\.(.+)$/)[1];
            if(angular.lowercase(ext) ==='jpg' || angular.lowercase(ext) ==='jpeg' || angular.lowercase(ext) ==='png'){
                    var file = $scope.myFile;
                    var uploadUrl = "/upload", 
                        promise = fileUploadService.uploadFileToUrl(file, uploadUrl);
         
                    promise.then(function (response) {
                        $scope.serverResponse = response.data;
                        alert($scope.serverResponse.data)
                    }, function () {
                        $scope.serverResponse = 'An error has occurred';
                        alert($scope.serverResponse)
                    })
                
            }  
            else{
                alert("Invalid File Format");
            }   
        }
    });
 
})();