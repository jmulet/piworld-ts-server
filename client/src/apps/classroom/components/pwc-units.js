

var pwcUnitsCtrl = function ($rootScope, $http, $translate, $timeout, Modals, Session, growl) {
    var ctrl = this;
    ctrl.tgs = { edition: false };
    ctrl.USER_ROLES = pwApp.UserRoles;
    ctrl.currentYear = pwApp.config.currentYear;

    ctrl.showAllIn = function (u) {
        u.showAll = true;
    };


    ctrl.noGhostFilter = function (value) {
        return !value.gopts.isGhost;
    };


    ctrl.reload = function (forceUpdate) {
        if (!ctrl.pwcID) {
            return;
        }
      
        if (!ctrl.group) {
            if (ctrl.user.groups.length) {
                ctrl.group = ctrl.user.groups[0];
                ctrl.onChangeGrp(true);
            } else {
                 ctrl.units = [];
                return;
            }
            return;
        }
        var idGroup = ctrl.group.idGroup;

        $http.post('@/api/assignments/queryasgn', {idGroup: idGroup, idUser: ctrl.user.id }, true).then(function (r) {

            r.data.forEach(function (u) {
                //Types of unit visible when page loaded: 
                //0 --> Hidden for students & Collapsed for teachers
                //1 --> Always collapsed 
                //2 --> Auto  (shows all assignments in active units and the 1st one in inactive ones)
                //3 --> Shows all assignments in any units

                //Decide if collapse
                switch (u.visible) {
                    case 0: u.collapsed = true; break;
                    case 1: u.collapsed = true; u.showAll = false; break;
                    case 2: u.collapsed = false; u.showAll = (ctrl.group.currentUnit === u.id); break;
                    default: u.collapsed = false; u.showAll = true;
                }
                u.assignments.forEach(function (a) {
                    if (a.fromDate) {
                        a.fromDate = new Date(a.fromDate);
                    }
                    if (a.toDate) {
                        a.toDate = new Date(a.toDate);
                    }
                });
            });

            ctrl.units = r.data;
 
            ctrl.units_collapse_ini = r.data.map(function (u) {
                return { collapsed: u.collapsed, showAll: u.showAll };
            });
  
        });

    };


    ctrl.toggleGlobalCollapse = function () {
        if (!ctrl.units_collapse_ini) {
            return;
        }
        if (ctrl.tgs.globalCollapse) {
            //Restore the collapse state with initial values
            jQuery.each(ctrl.units, function (i, e) {
                e.collapsed = ctrl.units_collapse_ini[i].collapsed;
                e.showAll = ctrl.units_collapse_ini[i].showAll;
            });
        } else {
            //Collapse all units
            jQuery.each(ctrl.units, function (i, e) {
                e.collapsed = true;
            });
        }
        ctrl.tgs.globalCollapse = !ctrl.tgs.globalCollapse;
    };


    ctrl.onChangeGrp = function (forceUpdate) {

        if (!ctrl.group) {
            return;
        }

        $rootScope.$broadcast("changeGrp", { group: ctrl.group });
        Session.setCurrentGroup(ctrl.group);

        if (ctrl.user.idRole === USER_ROLES.student) {
            if (ctrl.group.gopts.lang) {
                $translate.use(ctrl.group.gopts.lang);
            } else {
                $translate.use(ctrl.user.language || navigatorLang());
            };
        }

        ctrl.reload(forceUpdate);
    };



    ctrl.authAndGo = function (route) {
        Modals.sudlg(function () {
            //$state.go(route);
        });

    };


    ctrl.goAsgn = function (a, list) {
        Session.setRelatedActivity(list);
        //$state.go("home.activity", { idActivity: a.idActivity, idAssignment: a.id });
    };


    ctrl.$onInit = function () {
        ctrl.pwcID = Math.random().toString(36);
        if (!ctrl.user) {
            return;
        }

        var g = Session.getCurrentGroup();
        if (g) {
            jQuery.each(ctrl.user.groups, function (i, e) {
                if (e.idGroup === g.idGroup) {
                    ctrl.group = e;
                    return true;
                }
            });

            if (ctrl.group) {
                ctrl.onChangeGrp(true);
                return;
            }
        }

        if (ctrl.user.groups.length > 0) {
            ctrl.group = ctrl.user.groups[0];
            Session.setCurrentGroup(ctrl.group);
            ctrl.onChangeGrp(true);
        }



    };



    ctrl.$onChanges = function (changes) {
        if (ctrl.pwcID && changes.group) {
            ctrl.reload(true);
        }
    };
};

/************************************************************************************************************
*  UNITS COMPONENT
************************************************************************************************************/


pwcUnits.$inject = ["$rootScope", "$http", "$translate", "$timeout", "Modals", "Session", "growl"];

angular("ngApp").component("pwcUnits", {
    bindings: {
        user: "<",
        group: "<",
        collapse: "<",
        mobile: "@"
    },
    templateUrl: require("./pwc-units.html"),
    controller: pwcUnitsCtrl,
    controllerAs: "vm"
});