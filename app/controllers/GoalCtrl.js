"use-strict";

Sccssr.controller("GoalCtrl", [
	"$scope",
	"$location",
	"goalFactory",
	"authFactory",

	function ($scope, $location, goalFactory, authFactory) {
		console.log("goal control is working");
		$scope.goals = [];
		let currentUser = authFactory.getUserData();
		console.log(currentUser);
		// Invoke the promise that reads from Firebase
		goalFactory(currentUser.uid).then(
			// Handle resolve() from that promise
			goalCollection => Object.keys(goalCollection).forEach(key => {
				goalCollection[key].id = key;
				$scope.goals.push(goalCollection[key]);
			}),
			// Handle reject() from the promise
			err => console.log(err)
		);
	}

]);