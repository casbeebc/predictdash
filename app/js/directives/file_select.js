const papaparse = require('papaparse');

function FileSelectDirective() {
  'ngInject';
  return {
    restrict: 'A',
    require: 'ngModel',
    link:  (scope, el) => {
        el.bind('change', (e) => {
          var files = e.target.files;
          
          var config = {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              console.log(results.data);
            }
          };
          
          if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              papaparse.parse(files[i], config);
            }
          }
        });
    }
  };
}

export default {
  name: 'fileSelect',
  fn: FileSelectDirective
};
