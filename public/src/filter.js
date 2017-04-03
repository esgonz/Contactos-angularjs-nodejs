angular.module('contactsApp')
	.filter('labelCase', function () {
		return function (input){
			//agregar espacio entreLetra -> entre Letra
			input = input.replace(/([A-Z])/g,' $1');

			//mayuscula primera letra
			return input[0].toUpperCase() + input.slice(1);
		};	
	})
	.filter('keyFilter', function(){
		return function (obj, query){
			var result = {};
			angular.forEach(obj, function (val, key){
				if(key !== query){
					result[key] = val;
				}

			});

			return result;
		}
	})
	.filter('camelCase', function(){
		return function (input){
			//First Name -> first name -> first( n)ame -> firstName
			return input.toLowerCase().replace(/ (\w)/g, function (match, letter){
				return letter.toUpperCase();
			});
		}
	})	