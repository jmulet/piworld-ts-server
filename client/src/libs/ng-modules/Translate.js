
(function () {

    var app = angular.module("TranslateModule", ["pwCore"]);

    app.service('$translate', ["Translations", "Lang", function(Translations, Lang) {

        var TRANS= {}; 

        this.addTranslations = function(lang, dict){
            var langDict = TRANS[lang];
            if (!langDict) {
                langDict = {};
                TRANS[lang] = langDict;
            }

            Object.keys(dict).forEach( function(key) {
                langDict[key] = dict[key];
            });
        };

        if (Translations) {
            this.addTranslations(Lang, Translations);
        }

        this.find = function(key) {
            return (TRANS[Lang] || {})[key] || key;
        }

        return this;
    }]);

    app.directive('translate', ['$translate', function ($translate) {

        return {
            restrict: "A",
            link: function(scope, element, attrs){
                var key = attrs.translate;
                element.html($translate.find(key));
            }
        }

    }]);

})();