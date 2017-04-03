/**
*  Module
*
* Description
*/
console.log("initialize controller.js");

angular.module('contactsApp')
    .controller('listCtrl',  function($scope, $rootScope, $location, Contact, options) {
        
        console.log("listCtrl");
        $rootScope.PAGE= "all";      
        
        $scope.contacts = Contact.query(); //conectar con contact Factory
        $scope.fields = ['firstName', 'lastName'].concat(options.displayed_fields);

        $scope.sort = function (field){
            $scope.sort.field = field;
            //cambiar el estado booleano de order -> true a false, flase a true
            $scope.sort.order = !$scope.sort.order;

        };
        //set inicial sort, agregando atributos field y oder 
        $scope.sort.field = 'firstName';
        $scope.sort.order = false; 

        //ir a la pagina de contacto cuando haga click
        $scope.show = function (id){
            $location.url('/contact/'+ id);
        };
    })
    .controller('newCtrl',  function($scope, $rootScope, $location, Contact) {
        $rootScope.PAGE= "new"; 
        $scope.contact = new Contact(
                {
                    firstName:  ['', 'text'],
                    lastName:   ['', 'text'],
                    email:      ['', 'text'],
                    homePhone:  ['', 'tel'],
                    celPhone:   ['', 'tel'],
                    birthday:   ['', 'date'],
                    website:    ['', 'url'],
                    address:    ['', 'text']
                }
            );
        $scope.save = function (){
            if($scope.newContact.$invalid){
                //newContact nombre de formulario
                $scope.$broadcast('record:invalid');
            } else {
                $scope.contact.$save();
                $location.url("/contacts");
            }

        };
    })
    .controller('singleCtrl', function($rootScope, $scope, $location, Contact, $routeParams){
        $rootScope.PAGE= "single"; 
        $scope.contact = Contact.get({id: parseInt($routeParams.id, 10)});
        $scope.delete = function(){
            $scope.contact.$delete();
            $location.url('/contacts');
        }
    })
    .controller('settingsCtrl', function($rootScope, $scope,options, Fields){
        $rootScope.PAGE= "settings"; 
        $scope.allFields = [];
        $scope.fields = options.displayed_fields;

        //retorna todas las opciones
        Fields.headers().then (function (data){
            //data sera todos los fields de allfields cargadas en el deferred
            $scope.allFields = data;
        });

        $scope.toggle = function (field){
            var i = options.displayed_fields.indexOf(field);

            if (i > -1){
               options.displayed_fields.splice(i, 1);
            }else{
                options.displayed_fields.push(field);
            }
            Fields.set(options.dosplayed_fields);

        };
    })