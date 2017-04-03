/**
*  Module
*
* Description
*/
console.log("initialize app.js");

angular.module('contactsApp', ['ngRoute', 'ngResource', 'ngMessages'])

    .config(function($routeProvider, $locationProvider) {
        //route config
        $routeProvider
            .when('/contacts/', {
                templateUrl: 'views/list.html',
                controller: "listCtrl"
            })

            .when('/contact/new', {
                templateUrl: 'views/new.html',
                controller: "newCtrl"
            })

            .when('/contact/:id', {
                templateUrl: 'views/single.html',
                controller: "singleCtrl"
            })

            .when('/settings',{
                controller: 'settingsCtrl',
                templateUrl: 'views/settings.html'
            })

            .otherwise({
                redirectTo: '/contacts'
            })

        //location config
        // configure html5 to get links working on jsfiddle
        $locationProvider
            .html5Mode(true);
    })
    
    .value('options', {})
    .run(function($rootScope, options, Fields){
        //rootscope, value options, factory fields
        $rootScope.PAGE= "all";

        //llamo a la funcion get del factory
        /*Fields.get().success(function (data){
            options.displayed_fields = data;
        });*/
    })






