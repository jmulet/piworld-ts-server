var app = angular.module("pw-sample", []);

app.component("appComponent", {
    templateUrl: "/fc/home_app.html",
    controller: function() {
        var vm = this;
        vm = "foo";
    },
    controllerAs: "vm"
});