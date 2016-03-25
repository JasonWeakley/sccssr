"use strict";

Sccssr.controller("PageCtrl",
[
  "$scope",
  "$location",
  "$http",
  "authFactory",
  "firebaseURL",

  function ($scope, $location, $http, authFactory, firebaseURL) {

    // Local variables
    let ref = new Firebase(firebaseURL);

    $scope.isAuthenticated = () => {
      return authFactory.isAuthenticated();
    };

    // Attempt to register a new user account.
    // If successful, immediately log user in.
    $scope.logout = () => {
      console.log("Unauthenticating user");
      ref.unauth();
    };

  }
]);









