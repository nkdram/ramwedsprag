(function () {
    'use strict';

    // Setting up route
    angular.module('main').config(['$stateProvider',
        function ($stateProvider) {
            // Users state routing
            $stateProvider.
                state('home', {
                    url: '/home',
                    templateUrl: '/assets/modules/home/views/home.client.view.html'
                })
                .state('homepage', {
                    url: '',
                    templateUrl: '/assets/modules/home/views/home.client.view.html'
                })
                .state("modalregister", {
                    url: "/register",
                    templateUrl: "/assets/modules/home/views/home.client.view.html"
                }).state("modalevent", {
                    url: "/events",
                    templateUrl: "/assets/modules/home/views/home.client.view.html"
                });
        }
    ]);
})();

