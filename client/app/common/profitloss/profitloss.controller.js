class ProfitLossController {
  constructor($scope, ProfitLossService) {
    "ngInject";
    this.name = 'profitloss';
    $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

    $scope.labels = [];
    
    $scope.data = [];
    
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
      
      $scope.data = [
        ProfitLossService.profitLossPerDay()["profits"],
        ProfitLossService.profitRunningTotalPerDay() 
      ];
    });
    
  }
}

export default ProfitLossController;
