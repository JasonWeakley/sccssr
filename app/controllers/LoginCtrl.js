"use-strict";

Sccssr.controller("LoginCtrl", [
	"$scope",
	"$location",
	"authFactory",
	"firebaseURL",

	function ($scope, $location, authFactory, firebaseURL) {
		console.log("LoginCtrl is working");
		// Local variables
		let ref = new Firebase(firebaseURL);

		// Variables on $scope for use in DOM
		$scope.account = { email: "", password: "" };
		$scope.message = "";

		// Attempt to register a new user. If successful immediately login user.

		$scope.register = () => {
			ref.createUser({
				email		: $scope.account.email,
				password: $scope.account.password
			}, (error, userData) => {
				if (error) {
					console.log(`Error creating user: ${error}`);
				} else {
					console.log(`Created user account with uid: ${userData.uid}`);
					authFactory.storeUser(userData)
					.then(
						() => $scope.login(),
						(error) => console.log("There was an error!")
					);
				}
			});
		};

		// Attempt to authenticate user with supplied credentials.
		$scope.login = () =>
			authFactory
				.authenticate($scope.account)
				.then(() => {
					console.log("go to Dash");
					$location.path("/");
					$scope.$apply(); // Needed for $location.path() to succeed
				});

	}
]);
