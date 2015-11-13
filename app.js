var app = angular.module('plnkrApp', ['ngMaterial', 'ngCsvImport', 'ngMessages', 'ngSanitize', 'ngCsv']);

app
  .controller("DemoController", function($scope, $http) {

    $scope.csv = {
      "separator": "\t",
      "header": true,
      "accept": ".txt,.csv"
    };

    $scope.radioData = [{
      label: 'Comma',
      value: ","
    }, {
      label: 'Tabs',
      value: "\t"
    }];

    $scope.fileData = [{
      label: 'TXT',
      value: "txt"
    }, {
      label: 'CSV',
      value: "csv"
    }];

    var vinPattern = /^[\d\w]+$/;

    $scope.$watch('csv.result', function(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        getFileInfo(newVal);
        checkExtension(newVal);
      }
    });
    
    $scope.remove = function(result) {
      $scope.csv.result.splice(result, 1);
      fileEach($scope.csv.result);
    };

    function fileEach(object) {
      var patt = new RegExp(vinPattern);
      var sliced = [];

      $scope.hasErrors = false;
      $scope.isClean = false;

      getHeaders(object[0]);

      object.forEach(function(item, index, obj) {
        item.VIN = item.VIN.split(' ').join('');
        if (item.VIN.length !== 17 || !patt.test(item.VIN)) {
          sliced.push(index);
        }
      });

      if (sliced.length) {
        $scope.sliced = sliced;
        $scope.hasErrors = true;
      } else {
        $scope.isClean = true;
      }
    }

    function getFileInfo(object) {
      $scope.fileExtension = object.filename.split('.').pop().toLowerCase();
      $scope.fileName = object.filename.replace(/\.[^/.]+$/, "");
    }

    function checkExtension(object) {
      $scope.badExtension = false;
      if ($scope.fileExtension === 'csv' || $scope.fileExtension === 'txt') {
        fileEach(object);
      } else {
        $scope.badExtension = true;
      }
    }

    function getHeaders(object) {
      $scope.indexes = [];
      for (var index in object) {
        $scope.indexes.push(index);
      }
    }

  });