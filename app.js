var app = angular.module('plnkrApp', ['ngMaterial', 'ngCsvImport', 'ngMessages', 'ngSanitize', 'ngCsv']);

app
  .controller("DemoController", function($scope, $http){

    $scope.csv = {
      "separator": "\t",
      "header": true
    };
    
    $scope.radioData = [
      { label: 'Comma', value: "," },
      { label: 'Tabs', value: "\t" }
    ];
    
    $scope.vinPattern = /^[\d\w]+$/;
    
    $scope.fileEach = function(object) { 
      var patt = new RegExp($scope.vinPattern);
      var sliced = [];
      
      $scope.hasErrors = false;
      $scope.isClean = false;
      
      $scope.indexes = [];
      for(var index in object[0]){
          $scope.indexes.push(index);
      }

      object.forEach(function(item, index, obj){
        item.VIN = item.VIN.split(' ').join('');
        if(item.VIN.length !== 17 || !patt.test(item.VIN)) {
          sliced.push(index);
        }
      });
      if(sliced.length) {
        $scope.sliced = sliced;
        $scope.hasErrors = true;
      } else {
        $scope.isClean = true;
      }
    };
   
    
    $scope.$watch('csv.result', function(newVal, oldVal){
        if(newVal && newVal !== oldVal) {
            $scope.fileExtension = newVal.filename.split('.').pop();
            $scope.badExtension = false;
            if($scope.fileExtension === 'csv' || $scope.fileExtension === 'txt') {
              $scope.fileEach(newVal);
            } else {
               $scope.badExtension = true;
            }
        }
    });
    
    
    
  });