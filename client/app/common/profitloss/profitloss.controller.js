class ProfitLossController {
  constructor($scope, ProfitLossService) {
    "ngInject";
    this.name = 'profitloss';
    $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
    
    $scope.labels = [];
    $scope.dates = ProfitLossService.profitLossPerDay()["profits"];
    $scope.data = [];
    $scope.chartOptions = {
      // Container for pan options 
      pan: {
          // Boolean to enable panning 
          enabled: true,
          sensitivity: 3,
          speed: 10,
          threshold: 10,
          // Panning directions. Remove the appropriate direction to disable  
          // Eg. 'y' would only allow panning in the y direction 
          mode: 'x'
      },
      
      // Container for zoom options 
      zoom: {
          // Boolean to enable zooming 
          enabled: true,
          sensitivity: 3,
          speed: 10,
          threshold: 10,
          // Zooming directions. Remove the appropriate direction to disable  
          // Eg. 'y' would only allow zooming in the y direction 
          mode: 'xy',
      },
      scales: {}
    };
    $scope.datasetOverride = [
      {
        label: "Bar chart",
        borderWidth: 1,
        type: 'bar'
      },
      {
        label: "Line chart",
        borderWidth: 3,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        type: 'line'
      }
    ];
    $scope.$watch(function() { return ProfitLossService.dataLength; }, () => {
      $scope.labels = ProfitLossService.profitLossPerDay()["dates"];
      $scope.chartOptions['scales'] = {
        xAxes: [{
          ticks: {
            min: $scope.labels[0],
            max: $scope.labels[$scope.labels.length-1]
          }
        }]
      };
      
      $scope.data = [
        ProfitLossService.profitLossPerDay()["profits"],
        ProfitLossService.profitRunningTotalPerDay() 
      ];
    });
    
  }
}

export default ProfitLossController;
