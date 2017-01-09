import Papa from 'papaparse';

function ExampleCtrl($scope) {
  'ngInject';
  
  const vm = this;
  
  // for multiple files:
  $scope.uploadFiles = function (files) {
    var config = {
      header: true,
      skipEmptyLines: true
    };
    if (files && files.length) {
      for (var i = 0; i < files.length; i++) {
        console.log(Papa.parse(file, config));
      }
    }
  }
  /*
  vm.onChange = function(event) {
     var files = event.target.files; //FileList object
     for (var i = 0; i < files.length; i++) {
         var file = files[i];
         Papa.parse(file, config);
     }
   };
   */
}

export default {
  name: 'ExampleCtrl',
  fn: ExampleCtrl
};
