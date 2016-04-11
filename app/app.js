"use strict";

const Sccssr = angular.module("GoalApp", ["ngRoute", "firebase", "ui.sortable"])
	.constant("firebaseURL", "https://sccssr.firebaseio.com/");

// Define a promise for any view that needs an authenticated user before it will resolve (see below)

let isAuth = (authFactory) => new Promise((resolve, reject) => {
	if (authFactory.isAuthenticated()) {
		console.log("User is authenticated, resolve route promise");
		resolve();
	} else {
		console.log("User is not authenticated, reject route promise");
		reject();
	}
});

// Setup routes for Sccssr app

Sccssr.config(["$routeProvider",
	function ($routeProvider) {
		$routeProvider.
			when("/", {
				templateUrl: "partials/dashboard.html",
				controller: "GoalCtrl",
				resolve: { isAuth }
			}).
			when("/goals/addnew", {
        templateUrl: "partials/bounce-loader.html",
        controller: "PageCtrl",
        resolve: { isAuth }
      }).
		  when("/login", {
	      templateUrl: "partials/login.html",
	      controller: "LoginCtrl"
      }).
      when("/logout", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl"
      }).
      when("/goals/new", {
        templateUrl: "partials/add-new-goal.html",
        controller: "GoalFormCtrl",
        resolve: { isAuth }
      }).
      when("/goals/term", {
      	templateUrl: "partials/type-goal-term.html",
        controller: "GoalFormCtrl",
        resolve: { isAuth }
      }).
      when("/goals", {
        templateUrl: "partials/dashboard.html",
        controller: "GoalDetailCtrl",
        resolve: { isAuth }
      }).
      when("/goals/:goalId", {
        templateUrl: "partials/goal-detail.html",
        controller: "GoalDetailCtrl",
        resolve: { isAuth }
      }).
      otherwise({
        redirectTo: "/login"
      });
	}]);

//  When the application first loads, redirect the user to the login form if there is no authentication
Sccssr.run([
	"$location",

	($location) => {
		let sccssrRef = new Firebase("https://sccssr.firebaseio.com/");

		sccssrRef.onAuth(authData => {
			if (!authData) {
				console.log("onAuth detected unauthenticated client");
				$location.path("/login");
			}
		});
	}
]);
