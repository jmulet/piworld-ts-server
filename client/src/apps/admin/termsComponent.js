module.exports = function (ngApp) {

    var controller = function ($http)  {
        var ctrl = this;

        ctrl.$onInit = function () {

            ctrl.create = function () {

            };
    
            ctrl.edit = function(h) {
    
            };
    
            ctrl.remove = function(h) {
    
            };
    
            ctrl.cancel = function(h) {
    
            };
    
            ctrl.save = function(h) {
    
            };
    
        };
    };

    controller.$inject = ['$http'];

    ngApp.component("pwcTerms", {
        bindings: {
            idSchool: "<",
            termList: "="
        },
        template: require("./termsComponent.html"),
        controller: controller,
        controllerAs: "vm"
    });

};