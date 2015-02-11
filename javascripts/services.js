/**
 * New node file
 */
(function(){
	var myResumeServices = angular.module('myResumeServices', []);
	
	/**************************************
	* Data service
	***************************************/
	
	myResumeServices.factory('myResumeData', function($http, utility){
		
		return {
			getResumeData: function(){
				return $http.get('contents.json');
			},
			getSections: function(){
				return ['About', 'Tweets', 'Timeline', 'Skills', 'Projects'];
			},
			getTimelineData: function(cb){
				utility.getResumeData(function(ResumeData){
					var timeline = {
						data	: ResumeData.Timeline,
						parts	: ["Education", "Works", "Activities"],
						def		: {
							"Education"	: {
								"icon": "fa-graduation-cap"
							},
							"Works"		: {
								"icon": "fa-paper-plane-o"
							},
							"Activities": {
								"icon": "fa-graduation-cap"
							},
						}
					}
					cb(timeline);
				});
			},
			getSkillData: function(cb){
				utility.getResumeData(function(ResumeData){
					var skills = ResumeData.Skills;
					skills.Languages.colors = ["#869198", "#66CC66", "#86CDEA"];
					cb(skills);
				});
			},
			getProjectData: function(cb){
				utility.getResumeData(function(ResumeData){
					
				});
			},
			getCountData: function(cb){
				utility.getResumeData(function(ResumeData){
					
				});
			},
			getTweetsData: function(cb){
				utility.getResumeData(function(ResumeData){
					var tweets = ResumeData.Quotes;
					cb(tweets);
				});
			}
		}
		
		/*
		
			getTechnos : function(){
				var technos = {
					img : [
						{
							src   : 'img/technos/angularjs.png',
							title : 'AngularJS'
						},
						{
							src   : 'img/technos/html5.png',
							title : 'HTML5'
						},
						{
							src   : 'img/technos/css3.png',
							title : 'CSS3'
						},
						{
							src   : 'img/technos/bootstrap.jpg',
							title : 'Twitter Bootstrap'
						},
						{
							src   : 'img/technos/ascensorjs.jpg',
							title : 'AscensorJS'
						}
					],
					source : {
						text     : 'Sources du site sur ',
						link     : 'https://github.com/Nicolest/myresume'
					}				
				}
				return technos;
			}
		};*/
	});
	
	/**************************************
	* Mail service
	***************************************/
	
	myResumeServices.factory('mailManager', function($http){
		return {
			getContactTemplates : function(){
				return {contactForm:'views/contactForm.html', contactConfirm:'views/contactConfirmation.html'};
			},
			submitContactForm : function(data, callbackSuccess, callbackError){
				$http.post('/application/email.php', {name:data.name, email:data.email, message:data.message})
				.success(function(){
					callbackSuccess();
				})
				.error(function(){
					callbackError();
				});
			}
		};
	});
	
	/**************************************
	* Timeline service
	***************************************/
	
	myResumeServices.factory('timelineManager', function(){
		return {
			launchTimeline : function(dataUrl, lang){
				MY_RESUME.launchTimeline(dataUrl, lang);
			}
		};
	});
	
	/**************************************
	* Utility service
	***************************************/
	
	myResumeServices.factory('utility', function($http){
		var ResumeData = null;
		return {
			contains : function(value1, value2){
				return MY_RESUME.contains(value1, value2);
			},
			getDurationInYears : function(greater, startDate, endDate){
				return MY_RESUME.getDurationInYears(greater, startDate, endDate);
			},
			replaceParameters : function(string, values){
				return MY_RESUME.replaceParameters(string, values);
			},
			getResumeData: function(cb){
				if (ResumeData != null) cb(ResumeData);
				$http.get('contents.json').success(function(data){
					ResumeData = data;
					console.log("Resume Data loaded!");
					cb(data);
				})
			}
		};
	});
	
	/**************************************
	* Loader management
	***************************************/
	
	// http method for which we want to display a spinner 
	var httpMethodWithSpinner = 'POST';
	// intercept http methods to add treatment
	myResumeServices.factory('myHttpInterceptor', function($q, $rootScope){
		return {
			'request': function(config) {
				if(config.method == httpMethodWithSpinner){
					// show loader
					$rootScope.$broadcast("show_loader");
				}
				return config || $q.when(config);
			},
			'response': function(response) {
				if(response.config.method == httpMethodWithSpinner){
					$rootScope.$broadcast("hide_loader");
				}
				return response || $q.when(response);
			},
			'responseError': function (rejection) {
				if(rejection.config.method == httpMethodWithSpinner){
					$rootScope.$broadcast("hide_loader");
				}
				return $q.reject(rejection);
			}
		};
	});
	myResumeServices.config(function($httpProvider){
		$httpProvider.interceptors.push('myHttpInterceptor');
	});
	myResumeServices.directive("loader", function(){
		return {
			link : function($scope, element){
				// hide the element initially
				element.hide();
				$scope.$on("show_loader", function () {
					element.show();
				});
				$scope.$on("hide_loader", function () {
					element.hide();
				});
			}
		};
	});
	
})();
