(function () {
    'use strict';
    var myApp = angular.module('app');
    myApp.service('fileUploadService', function ($http, $q) {
 
        this.uploadFileToUrl = function (file, uploadUrl) {
            var fileFormData = new FormData();
            fileFormData.append('file', file);
            var deffered = $q.defer();
            $http.post(uploadUrl, fileFormData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
 
            }).then(function (response) {
                deffered.resolve(response);
            }) 
           return deffered.promise;
        }
    });
})();