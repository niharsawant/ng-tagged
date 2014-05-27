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
        placeholder : '@',
        tags : '=ngModel',
        onadd : '&',
        onblur : '&',
        onremove : '&'
      },
      controller : function ($scope, $attrs, $element) {
        $attrs.$observe('placeholder', function (value) {
          $scope.placeholder = value || 'Add a tag';
        });
      },
      link : function (scope, element, attrs) {
        // Private method which will dynamically increase the width of the
        // textbox
        var extendInputWidth = function (element) {
          var fontSize = element.clientHeight/2;
          var textWidth = fontSize * element.value.length;

          // If width is larger than default width then increase it
          if (textWidth > element.clientWidth) {
            element.style.width = textWidth + fontSize;
          }
        };

        var resetInputWidth = function (element) {
          element.style.width = '';
        };

        // Actual function taking care of adding tags and related functionality
        scope.addTag = function () {
          if (!scope.tagText) { return; } // Check for undefined
          scope.tagText = scope.tagText.trim();
          if (!scope.tagText) { return; } // Check for all empty spaces
          scope.tagText = scope.tagText.replace(',','').trim();
          if (!scope.tagText) { return; } // Check for only comma

          scope.tags.push(scope.tagText);

          var response = {
            $tag : scope.tagText,
            $index : scope.tags.length
          };
          scope.onadd(response);

          scope.tagText = '';
        };

        // Actual function taking care of removing a tag from the array
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
            resetInputWidth(ev.srcElement);
            return false;
          }

          // Dynamically extend width of inputs
          extendInputWidth(ev.srcElement);
        };

        // Listen to every blur event of textbox and create a tag immedieatly
        // after that invoke the callback
        scope.listenToBlur = function (ev) {
          var response = { $event : ev };
          scope.addTag();
          scope.onblur(response);
        };

      }
    };
  });

})();
