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
        // Set default value for placeholder attribute
        $attrs.$observe('placeholder', function (value) {
          $scope.placeholder = value || 'Add a tag';
        });

        // Focus on input when clicked on any empty region of tag editor
        $element.on('click', function (ev) {
          if (this == ev.target) { $element.find('input')[0].focus(); }
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
          element.style.width = scope.inputWidth;
        };

        // Actual function taking care of adding tags and related functionality
        scope.addTag = function () {
          if (!scope.tagText) { return; } // Check for undefined
          scope.tagText = scope.tagText.trim();
          if (!scope.tagText) { return; } // Check for all empty spaces
          scope.tagText = scope.tagText.replace(',','').trim();
          if (!scope.tagText) { return; } // Check for only comma

          // Check for duplicate items
          if (scope.tags.indexOf(scope.tagText) != -1) { return; }

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

        // Listen to placeholder value and dynamically calculate the width of
        // the inputbox
        scope.$watch('placeholder', function (value) {
          var inputTag = element.find('input')[0];
          var pseudo = angular.element('<span></span>').text(value)
            .css({ visibility : 'hidden', width: 'auto' });

          element.append(pseudo);
          scope.inputWidth = pseudo.prop('offsetWidth') + 10;
          pseudo.remove();
        });

      }
    };
  });

})();
