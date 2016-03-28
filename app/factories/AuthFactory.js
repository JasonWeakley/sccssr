"use-strict";

Sccssr.factory("authFactory", (firebaseURL, $q, $http) => {
	let ref = new Firebase(firebaseURL);
	let currentUserData = null;


	return {
		// Determine is the user is authenticated
		isAuthenticated () {
			let authData = ref.getAuth();

			if (authData) {
				currentUserData = authData;
				return true;
			} else {
				return false;
			}
		},

		getUserData () {
			return currentUserData;
		},

		// Authenticate the user via Firebase
		authenticate (credentials) {
			return new Promise((resolve, reject) => {
				ref.authWithPassword({
					"email": credentials.email,
					"password": credentials.password
				}, (error, authData) => {
					if (error) {
						reject(error);
					} else {
						console.log("authWithPassword method completed successfully");
						resolve(authData);
					}
				});
			});
		},

		// Store the user as an object and post to Firebase
		storeUser (authData) {
			let stringifiedUser = JSON.stringify({ uid: authData.uid });
			console.log("Adding " + stringifiedUser + " to database.");
			return $q((resolve, reject) => {
				$http.post(`https://sccssr.firebaseio.com/users.json`, stringifiedUser)
				.then(
					data => resolve(data),
					error => reject(error)
				);
			});
		}
	};
});

