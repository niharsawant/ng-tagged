(function () {

  'use strict';

  var module = angular.module('ngTagged', []);

  module.directive('tagged', function () {
    return {
      restrict : 'E',
      require : 'ngModel',
      replace : true,
      templateUrl : '/ng-tagged/templates/tagged.html',
      transclude : false,
      scope : {
        tags : '=ngModel',
        onblur : '&'
      },
      link : function (scope, element, attrs) {

        // Listen to every keyup event from tag editor and decide when to
        // create a tag. As of now create a new tag when comma is pressed
        scope.listenToKey = function (ev) {
          if (ev.which === 188 || ev.keyCode === 188) {
            scope.tagText = scope.tagText.replace(',','').trim();
            scope.tags.push(scope.tagText);
            scope.tagText = '';

            return false;
          }
        };
      }
    };
  });

})();
