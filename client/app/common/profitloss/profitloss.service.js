function ProfitLossService() {
  'ngInject';
  this.name = "profitloss.service";
  var tradeHistoryModel = {};
  
  const service = {};
  
  var convertToNumber = (stringNumber) => {
    var isNegative = false;
    if(stringNumber.indexOf('(') > -1) {
      isNegative = true;
    }
    stringNumber = parseFloat(stringNumber.replace('$','').replace('(','').replace(')',''));
    if(isNegative) {
      stringNumber = stringNumber*-1.0;
    }
    return stringNumber;
  };
  
  service.load = function(data) {
    tradeHistoryModel = data;
    
    for(var trade of tradeHistoryModel) {
      trade['CreditDebit'] = convertToNumber(trade['CreditDebit']);
      trade['Fees'] = convertToNumber(trade['Fees']);
      trade['Price'] = convertToNumber(trade['Price']);
      trade['ProfitLoss'] = convertToNumber(trade['ProfitLoss']);
      trade['Risk'] = convertToNumber(trade['Risk']);
    }
    
  };
  
  service.getOutstandingPositions = function() {
    
  };
  
  return service;

}


export default ProfitLossService;