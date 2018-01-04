(function(){

var app = angular.module("PwTableModule", []);

app.factory('PwTable', ['$q', '$filter', function ($q, $filter) {

    var factory = function (params, datafunc) {
        var self = this;
        params.filter = params.filter ||  {};
        params.sorting = params.sorting ||  [];
        params.classes = params.classes ||  {};
        params.maxSize = params.maxSize || 5;
        params.total = 0;
        params.page = params.page ||  1;
        params.count = params.count || 10;
        params.counts = params.counts || [10, 20, 30];

        this.params = params;
        this.$loading = false;

        var mustFilter = function () {
            var hasKey = false;
            for (var ky in self.params.filter) {
                if (self.params.filter[ky] && self.params.filter[ky].trim()) {
                    hasKey = true;
                }
            };
            return hasKey;
        };

        this.sortBy = function (key) {
            var tmp = self.params.sorting.map(function (x) {
                return x.replace("+", "").replace("-", "");
            });

            var idx = tmp.indexOf(key);

            if (idx < 0) {
                self.params.sorting.unshift("+" + key);
            } else {
                var v = self.params.sorting[idx];
                var v1 = v.substring(0, 1);
                //Switch from asc -> desc -> none --> asc ...
                if (v1 === '+' || (v1 !== '+' && v1 !== '-')) {
                    self.params.sorting[idx] = '-' + key;
                } else {
                    self.params.sorting.splice(idx, 1);
                    self.params.classes[key] = "";
                }
            }
            self.paginate();
        };

        var orderBy = function () {
            var haskeys = self.params.sorting.length;
            var sortBy;
            if (haskeys) {
                sortBy = self.params.sorting;
                self.params.classes = {};
                jQuery.each(self.params.sorting, function (i, e) {
                    var type = "+";
                    if (e.substring(0, 1) === "-") {
                        type = "-";
                    }
                    var ky = e.replace("+", "").replace("-", "");
                    if (type === '-') {
                        self.params.classes[ky] = "glyphicon glyphicon-chevron-down";
                    } else {
                        self.params.classes[ky] = "glyphicon glyphicon-chevron-up";
                    }
                });
            }
            return sortBy;
        };



        this.setCount = function (count) {
            self.params.count = count || 1;
            self.paginate();
        };

        this.reload = function () {
            var defer = $q.defer();
            this.$loading = true;
            datafunc(defer, params);
            defer.promise.then(function (data) {
                self.allData = data;
                self.params.page = 1;
                self.paginate();
                self.$loading = false;
            });
        };

        this.paginate = function () {
            var data = angular.copy(this.allData);
            data = mustFilter() ? $filter('filter')(data, this.params.filter) : data;
            //Total is set after filtering
            this.params.total = data.length;
            this.pages = Math.ceil(this.params.total / this.params.count);
            var orderby = orderBy();
            data = orderby ? $filter('orderBy')(data, orderby) : data;
            data = data.slice((this.params.page - 1) * this.params.count, this.params.page * this.params.count);
            this.$data = data;
        };

        this.reload();

    };

    return factory;
}]);

})();