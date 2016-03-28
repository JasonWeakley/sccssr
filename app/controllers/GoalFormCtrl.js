"use-strict";

Sccssr.controller("GoalFormCtrl", 
[
	"$scope",
	"$location",
	"$http",

	function ($scope, $location, $http) {
		// Default property values for keys bound to input fields
		$scope.newGoal = {
			name: "",
			type: "",
			uid: "",
			startDate: "",
			endDate: null,
			objective: null
		};

		let ref = new Firebase("https://sccssr.firebaseio.com/goals");

		$scope.userId = ref.getAuth().uid;

		// Function bound to the Add Goal button
		$scope.addGoal = function () {

			// Post the goal to firebase
			$http.post(
				"https://sccssr.firebaseio.com/goals.json",

			// Remember to stringify objects/arrays before sending them to the API
			JSON.stringify({
				name: $scope.newGoal.name,
				type: $scope.newGoal.type,
				endDate: $scope.newGoal.endDate,
				startDate: $scope.newGoal.startDate,
				uid: $scope.userId,
				objective: $scope.objective
			})

			// The $http.post() method returns a promise, so you can use then()
			).then(
				() => $location.url("/"),							// Handle resolve and reload dashboard
				(response) => console.log(response)		// Handle reject
			);
		};
	} 
]);












