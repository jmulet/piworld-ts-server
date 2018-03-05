
angular.module('pwLoadingContainer', []).directive('pwcLoadingContainer', function() {
 
return {
    restrict: 'A',
    link: function (scope, element, attrs) {
        var overlay = angular.element('<div style="display:none;z-index:1000;background:lightgray;position:absolute;width:100%;height:100%;border:auto;">Loading...</div>');
        element.append(overlay);
        scope.$watch(attrs.loadingContainer, function (val) {
            if(val) {
                element.css("display", "");
            } else {
                element.css("display", "none");
            }
        });
    }
};
});