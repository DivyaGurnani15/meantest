(function() {
    'use strict';
    var myApp = angular.module('app');
    myApp.directive('demoFileModel', function ($parse) {
        return {
            restrict: 'A', 
            link: function (scope, element, attrs) {
                var model = $parse(attrs.demoFileModel),
                    modelSetter = model.assign;
                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    });
})();
