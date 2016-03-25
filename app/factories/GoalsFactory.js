"use-strict";

Sccssr.factory("goalFactory", ($q, $http) => { 
		let getGoals = function(uid) {
			return $q((resolve, reject) => { // Return a promise for asynchronous XHR
				$http
					.get(`https://sccssr.firebaseio.com/goals/.json?orderBy="uid"&equalTo="${uid}"`)
					.success(
						goalCollection => resolve(goalCollection),
						error => reject(error)
					)
			}
		)};
		return getGoals;
});
