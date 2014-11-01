(function () {
    'use strict;'

    var offlinesApp = angular.module('offlinesApp', ['ngResource']);

    offlinesApp.factory('Enums', [function () {

        return {
            localStorageKeys: {
                parks: 'offlines.parks'
            }
        };

    }]);

    offlinesApp.constant('_', window._);
    offlinesApp.constant('localStorage', window.localStorage);
    offlinesApp.constant('Offline', window.Offline);
}());