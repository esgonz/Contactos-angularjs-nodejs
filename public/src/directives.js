angular.module('contactsApp')
	.value('FieldTypes', {
		text: 		['Text', 'Should be text'],
		email: 		['Email', 'Should be email'],
		number: 	['Number', 'Should be number'],
		date: 		['Date', 'Should be date'],
		datatime: 	['Datatime', 'Should be datatime'],
		time: 		['Time', 'Should be time'],
		month: 		['Month', 'Should be month'],
		week: 		['Week', 'Should be week'],
		url: 		['Url', 'Should be url'],
		tel: 		['Tel', 'Should be tel'],
		color: 		['Color', 'Should be color']
	})
	/*
	directive crea un alemento angular
	retorna el objeto del elemento como un scope
		restrict: EA significa como E elemento o A atributo es decir 
		    elemento :<from-field.. > </form-field>
		    atributo : <div form-field ..> </div>
		template: la plantilla html de la directiva
		replace: remplazar el elemento html con la plantilla (true) ó insertar dentro del elemento html (false)
		scope:  variables a utilizar en la directiva
			contact:referencia a objeto, = significa que es una referencia directa, cualquier cambio al obj se ve reflejada en todo el modulo
			field , live, required : son solo referencias (solo lectura)
		link: funcion constructora del elemento	, se le pasa el scope como objeto
	 */
	.directive('formField', function($timeout, FieldTypes){
		return{
			restrict:'EA',
			templateUrl: 'views/form-field.html',
			replace: true,
			scope: {
				record: 	'=',
				field: 		'@',
				live: 		'@',
				required: 	'@'
			},
			link: function (scope, element, attr){
				//escucho la funcion invalid del record(obj contacto)
				//set field como dirty 
				scope.$on('record:invalid', function(){
					scope[scope.field].$setDirty();
				});

				scope.types = FieldTypes;

				scope.remove = function(field){
					delete scope.record[field];
					scope.blurUpdate();
				};

				scope.blurUpdate = function(){
					if (scope.live !== 'false'){
						//scope.record referencia hacia el objeto Contacto y su funcion Update
						scope.record.$update(function(updateRecord){
						scope.record = updateRecord;

						});
					}
				};

				var saveTimeout;
				scope.update = function(){
					$timeout.cancel(saveTimeout);
					saveTimeout = $timeout(scope.blurUpdate, 4000);
				};
			}
		};
	})
	/*$filter -> para acceder a los filtros del modulo desde angular code (no desde plantilla)
	FieldTypes values*/
	.directive('newField', function($filter, FieldTypes){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			scope: {
				record: "=",
				live: "@"
			 }, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			 require: '^form', // Array = multiple requires, ? = optional, ^ = check parent elements
			 restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			 templateUrl: 'views/new-field.html',
			 replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function(scope, iElm, iAttrs, form) {
				scope.types = FieldTypes;
				scope.field = {}; //field utilizado en template field.name, field,type

				scope.show = function(type){
					scope.field.type 	= type;
					scope.display 		= true;
				};

				scope.remove = function(){
					//si el usuario cancela la creacion de un nuevo input
					scope.field 	= {};
					scope.display	= false;
				};

				scope.add = function(){
					//si el formulario es un formulario llamado newField
					if(form.newField.$valid){
						//agregar attr al objeto record ~ contact
						scope.record[$filter('camelCase')(scope.field.name)] = [scope.field.value, scope.field.type];
						//borro el objeto temporal
						scope.remove();
						if (scope.live !== 'false'){
							//scope.record referencia hacia el objeto Contacto y su funcion Update
							scope.record.$update(function(updateRecord){
								scope.record = updateRecord;

							});
						}
					}
				};
			}
		};
	});