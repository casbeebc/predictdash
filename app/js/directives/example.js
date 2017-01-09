function ExampleDirective() {

  return {
    restrict: 'E',
    require: '?ngModel',
    templateUrl: 'directives/example.html',
    scope: {
      title: '@',
      message: '@clickMessage',
    }
    /*
    parseCSV: () => {
        var config = {
          header: true,
          skipEmptyLines: true
        };
        
        if (!$('#files')[0].files.length) {
          alert('Please choose at least one file to parse.');
          return enableButton();
        }
        
        $('#files').parse({
          config: config,
          before: function(file, inputElem)
          {
            console.log('Parsing file...', file, inputElem);
          },
          error: function(err, file)
          {
            console.log('ERROR:', err, file);
          },
          complete: function()
          {
            console.log('COMPLETE');
          }
        });
    }
    */
  };
}

export default {
  name: 'exampleDirective',
  fn: ExampleDirective
};
