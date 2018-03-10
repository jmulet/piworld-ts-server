var HolidayModel = require("../../libs/entities/HolidayModel");
module.exports = function(ngApp) {
    
    var controller = function($http, Modals, growl) {
        var ctrl = this;
        
        ctrl.dateOptions = {
            startingDay: 1
        };
        
        ctrl.reload = function() {
            $http.get("@/api/school/holiday/list?idSchool="+ctrl.idSchool+"&year="+ctrl.year).then(function(r){
                ctrl.holidays = r.data;
            });
        };
        
        ctrl.create = function () {
            const h = HolidayModel.defaultObject;
            h.year = ctrl.year;
            h.idSchool = ctrl.idSchool;
            ctrl.holidays.push(h);
            ctrl.edit(h);
        };

        ctrl.edit = function(h) {
            delete h._backup;
            h._backup = angular.copy(h);
            h.opened1 = false;
            h.opened2 = false;
            h.edit = true;
        };

        ctrl.remove = function(h) {
            var okcb = function() {
                $http.delete("@/api/school/holiday?idHoliday="+h.id).then(function(r){
                    ctrl.reload();
                });                
            };
            Modals.confirmdlg("Confirm delete holiday " + h.description, "Segur que voleu eliminar l'entrada?", okcb);
        };

        ctrl.cancel = function(h) {
            if(h._backup) {
                for(var key in h._backup) {
                    h[key] = h._backup[key];
                }
            }
            h.edit = false;
            delete h._backup;
        };

        ctrl.save = function(h) {
            var h2 = angular.copy(h);
            delete h2._backup;
            delete h2.edit;
            delete h2.opened1;
            delete h2.opened2;
            $http.post("@/api/school/holiday", h2).then(function(r){
                h.edit = false;
                if(!h.id && r.data.id)
                {
                    h.id = r.data.id;
                }
                delete h._backup;
                h.opened1 = false;
                h.opened2 = false;                
            }, function(){
                growl.error("Invalid values");
            });       
        };

        ctrl.$onInit = function() {
            ctrl.reload();
        };
    };


    controller.$inject = ['$http', 'Modals', 'growl'];

    ngApp.component("pwcHolidays", {
        bindings: {
            idSchool: "<",
            year: "<" 
        },
        template: require("./holidaysComponent.html"),
        controller: controller,
        controllerAs: "vm"
    });

};