import angular from 'angular';
import template from './fileselect.html';
import Papa from 'papaparse';

let fileSelectDirective = angular.module('fileselect', [] )

.directive('fileselect', (ProfitLossService) => {
  'ngInject';
  return {
    restrict: 'E',
    template,
    link:  (scope, el) => {
      
      el.bind('change', (e) => {
        var files = e.target.files;
        
        var config = {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            ProfitLossService.load(results.data);
          }
        };
        
        if (files && files.length) {
          for (var i = 0; i < files.length; i++) {
            Papa.parse(files[i], config); // parse the CSV
          }
        }
      });
    }
  };
})
  
.name;

export default fileSelectDirective;
