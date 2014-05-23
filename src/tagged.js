(function () {

  'use strict';

  var module = angular.module('ngTagged', []);

  module.directive('tagged', function () {
    return {
      restrict : 'E',
      replace : true,
      templateUrl : '/ng-tagged/templates/tagged.html',
      transclude : true,
      link : function (scope, element, attrs) {
        console.log(scope);
      }
    };
  });

})();
