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
        onadd : '&',
        onblur : '&',
        onremove : '&'
      },
      link : function (scope, element, attrs) {

        // Actual funtion taking care of adding tags and related functionality
        scope.addTag = function () {
          var response;
          scope.tagText = scope.tagText.replace(',','').trim();
          scope.tags.push(scope.tagText);

          response = {
            $tag : scope.tagText,
            $index : scope.tags.length
          };
          scope.onadd(response);

          scope.tagText = '';
        };

        scope.removeTag = function (tag, index) {
          var response = { $tag : tag, $index : index };
          scope.tags.splice(index, 1);
          scope.onremove(response);
        };

        // Listen to every keyup event from tag editor and decide when to
        // create a tag. As of now create a new tag when comma is pressed
        scope.listenToKey = function (ev) {
          if (ev.which === 188 || ev.keyCode === 188) {
            scope.addTag();
            return false;
          }
        };

      }
    };
  });

})();
