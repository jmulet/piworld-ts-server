
(function () {

    var app = angular.module("TranslateModule", []);

    app.service('$translate', function() {

        var TRANSLATIONS = {}; 

        this.addTranslations = function(lang, dict){
            var langDict = TRANSLATIONS[lang];
            if (!langDict) {
                langDict = {};
                TRANSLATIONS[lang] = langDict;
            }

            Object.keys(dict).forEach( function(key) {
                langDict[key] = dict[key];
            });
        };

        if (pwApp.translations) {
            this.addTranslations(pwApp.lang, pwApp.translations);
        }

        this.find = function(key) {
            return (TRANSLATIONS[pwApp.lang] || {})[key] || key;
        }

        return this;
    });

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