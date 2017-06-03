var myApp = angular.module('myApp', []);

myApp.controller('LoginCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

    console.log("Hello World from controller");

    $scope.check = function(){
        if($scope.username == "admin" && $scope.password == "admin")
        {
            $window.location.href = "public/items.html";
        }
        else{
            $window.alert("Wrong username password..!!");
            $window.location.href = "index.html";
        }
    };

}]);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {


    var refresh = function ()
    {
        $http.get('../admin/itemlist').success(function (response) {
            console.log("I got the data I requested");
            $scope.itemlist = response;
            $scope.item = "";
        });
    };
    refresh();

    $scope.addItem = function ()
    {
        $http.post('../admin/itemlist',$scope.item).success(function (response)
        {
            console.log("I am inside Add Items : ", response);
            refresh();
        })
    };

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('../admin/itemlist/'+id).success(function(response)
        {
            console.log("I am inside Delete Item", response);
            refresh();
        })
            .catch(function (error) {
                console.log('error', error);
            });
    };

    $scope.edit = function(id) {
        console.log(id);
        $http.get('../admin/itemlist/'+id).success(function(response)
        {
            console.log("I am inside Edit Item");
            $scope.item = response;
        })
            .catch(function (error) {
                console.log('error', error);
            });
    };

    $scope.update = function() {
        //console.log("Scope Item Id: ", $scope.item._id);
        console.log("Inside Update Scope Item: ", $scope.item);
        $http.put('../admin/itemlist/' + $scope.item.itemName, $scope.item).success(function(response) {
            refresh();
        })
    };

    $scope.deselect = function() {
        console.log("I am inside Deselect Item");
        $scope.item = "";
        $scope.customer = "";
    }

    var refreshUser = function ()
    {
        $http.get('../admin/customer').success(function (response) {
            console.log("I got the customers I requested");
            $scope.customerlist = response;
            $scope.customer = "";
        });
    };
    refreshUser();

    $scope.addCustomer = function ()
    {
        $http.post('../admin/customer',$scope.customer).success(function (response)
        {
            console.log("I am inside Add Customer : ", response);
            refreshUser();
        })
    };

    $scope.removeCustomer = function(id) {
        console.log(id);
        $http.delete('../admin/customer/'+id).success(function(response)
        {
            console.log("I am inside Delete Customer", response);
            refreshUser();
        })
            .catch(function (error) {
                console.log('error', error);
            });
    };

    $scope.editCustomer = function(id) {
        console.log(id);
        $http.get('../admin/customer/'+id).success(function(response)
        {
            console.log("I am inside Edit Customer");
            $scope.customer = response;
        })
            .catch(function (error) {
                console.log('error', error);
            });
    };

    $scope.updateCustomer = function() {
        //console.log("Scope Item Id: ", $scope.item._id);
        console.log("Inside Update Scope Customer: ", $scope.customer);
        $http.put('../admin/customer/' + $scope.customer._id, $scope.customer).success(function(response) {
            refreshUser();
        })
    };

}]);

