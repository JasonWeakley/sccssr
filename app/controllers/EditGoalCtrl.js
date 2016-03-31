// "use-strict";

// Sccssr.controller("EditGoalCtrl", [
// 	"$scope",

// 	function ($scope) {
//     // This function is bound to an ng-click directive on the edit button
//     $scope.editGoal = function(nameInput, typeInput, ObjInput, startDateInput, endDateInput) {
//       let clickEdit = $scope.selectedGoal.id;
//       console.log("clickEdit", clickEdit);
//       let ref = new Firebase ("https://sccssr.firebaseio.com/goals/" +clickEdit);
//       ref.update({
//         name: $scope.selectedGoal.name, 
//         type: $scope.selectedGoal.type,
//         objective: $scope.selectedGoal.objective,
//         startDate: $scope.selectedGoal.startDate,
//         endDate: $scope.selectedGoal.endDate
//       });
//       return $scope.editFieldVisible = false;
//     };	
// 	}

// ]);



