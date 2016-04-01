"use-strict";

Sccssr.controller("GoalDetailCtrl",
[
	"$scope",
  "$routeParams",
  "$http",
  "$location",
  "goalFactory",
  "authFactory",
  "$firebase",
  "Firebase",

  function ($scope, $routeParams, $http, $location, getGoals, authFactory, $firebase, Firebase) {

  	// Default properties for bround variables
  	$scope.goals = [];
  	$scope.selectedGoal = {};
    let currentUser = authFactory.getUserData();

  	// Invoke the promise that reads from Firebase
  	getGoals(currentUser.uid).then(

  		// Handle resolve() from the promise
  		goalCollection => {
  			Object.keys(goalCollection).forEach(key => {
  				goalCollection[key].id = key;
          console.log(goalCollection[key]);
  				$scope.goals.push(goalCollection[key]);
  			});

  			$scope.selectedGoal = $scope.goals.filter(goal => goal.id === $routeParams.goalId)[0];
        $scope.selectedGoal.startDate = new Date($scope.selectedGoal.startDate);
        $scope.selectedGoal.endDate = new Date($scope.selectedGoal.startDate);
        console.log("selectedGoal.startDate", typeof($scope.selectedGoal.startDate));
        console.log("Selected Goal",$scope.selectedGoal);
      },

      // Handle reject() from the promise
      err => console.log(err)
    );



    // Make the edit goal section invisible on goal-detail page load
    $scope.editFieldVisible = false;

    // Display the edit goal section when button is clicked
    $scope.showEditField = function () {
      return $scope.editFieldVisible = true;
    }

    // This function is bound to an ng-click on the Save Changes button
    $scope.editGoal = function(nameInput, typeInput, ObjInput, startDateInput, endDateInput) {
      let clickEdit = $scope.selectedGoal.id;
      console.log("clickEdit", clickEdit);
      let ref = new Firebase ("https://sccssr.firebaseio.com/goals/" +clickEdit);
      ref.update({
        name: $scope.selectedGoal.name, 
        type: $scope.selectedGoal.type,
        objective: $scope.selectedGoal.objective,
        startDate: $scope.selectedGoal.startDate,
        endDate: $scope.selectedGoal.endDate
      });
      return $scope.editFieldVisible = false;
    };

		// This function is bound to an ng-click directive on the delete button in goal-detail
		$scope.deleteGoal = function(event) {
      let clickDelete = event.target.id;
      $http
			.delete(`https://sccssr.firebaseio.com/goals/${clickDelete}.json`)
			.then(() => $location.url("/"));
      console.log(event);
    };

    // 3-way binding when updating goals
    $scope.init = function(id, property) {
      console.log("property", property);
      console.log("id",id);
      // Bind firebase data to scoped variable data
      let ref = new Firebase("https://sccssr.firebaseio.com/goals/"+id);

      // if statement looks for changes made by user, adds to firebase
      if (property = $scope.selectedGoal.name) {
          ref.update({name: property});
        } if (property = $scope.selectedGoal.type) {
          ref.update({type: property});
        } if (property = $scope.selectedGoal.objective) {
          ref.update({objective: property});
        } if (property = $scope.selectedGoal.startDate) {
          ref.update({startDate: property});
        } if (property = $scope.selectedGoal.endDate) {
          ref.update({endDate: property});
        }

    };

  }

]);









