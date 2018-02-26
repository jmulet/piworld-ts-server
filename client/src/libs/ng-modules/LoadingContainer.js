
angular.module('LoadingContainer', []).directive('loadingContainer', function() {
 
return {
    restrict: 'A',
    link: function (scope, element, attrs) {
        scope.$watch(attrs.loadingContainer, function (val) {
            if(val) {
                element.addClass("loading-spinner");
            } else {
                element.removeClass("loading-spinner");
            }
        });
    }
};
});