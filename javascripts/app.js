(function(){
	var myResume = angular.module('myResumeApp', ['myResumeServices', 'duScroll']);
		
	myResume.filter('skillsFilter', function($filter, utility){
		return function(skills, query, title){
			var filteredSkills = $filter('filter')(skills, query);

			// if the query corresponds to the title and the filtered skills are empty, we return all the skills
			if(utility.contains(title, query) && filteredSkills.length == 0){
				return skills;
			}
			return filteredSkills;
		};
	});
	
	myResume.controller('ResumeCtrl', function($scope, myResumeData){
		
		// Sections definition
		$scope.sectionDef = {
			'about'	: {
				'class': 'section-solid'
			},
			'timeline': {
				'class': 'section-solid'
			},
			'projects': {
				'class': 'projects'
			}
		}
		$scope.sections = myResumeData.getSections;
		
		myResumeData.getResumeData().success(function(data){
			//console.log(data);
			//$scope.timeline = data.Timeline;
		});
		
		/*
		 * Timeline
		 */
		myResumeData.getTimelineData(function(data){
			$scope.timeline = data;
		})
		
		myResumeData.getSkillData(function(data){
			$scope.skills = data;
		})
		
		myResumeData.getTweetsData(function(data){
			$scope.tweets = data;
		})
		
		myResumeData.getBriefData(function(data){
			console.log(data);
		})
	});
	
})();
