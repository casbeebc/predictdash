import moment from 'moment';

function ProfitLossService($rootScope) {
  'ngInject';
  this.name = "profitloss.service";
  var tradeHistoryModel = [];
  
  const service = {};
  
  var convertToNumber = (stringNumber) => {
    var isNegative = false;
    if(stringNumber.indexOf('(') > -1) {
      isNegative = true;
    }
    stringNumber = parseFloat(stringNumber.replace(/[^0-9.]/g, ''));
    stringNumber = isNaN(stringNumber) ? 0.0 : stringNumber;
    
    if(isNegative && stringNumber != 0) {
      stringNumber = stringNumber*-1.0;
    }
    return stringNumber;
  };
  
  service.dataLength = 0;
  
  service.load = function(data) {
    tradeHistoryModel = data;
    for(var trade of tradeHistoryModel) {
      trade['CreditDebit'] = convertToNumber(trade['CreditDebit']);
      trade['Fees'] = convertToNumber(trade['Fees']);
      trade['Price'] = convertToNumber(trade['Price']);
      trade['ProfitLoss'] = convertToNumber(trade['ProfitLoss']);
      trade['Risk'] = convertToNumber(trade['Risk']);
      // example "1/05/2017 1:24 PM"
      trade['DateExecuted'] = moment(trade['DateExecuted'], "M/DD/YYYY h:mm A");
    }
    service.dataLength = tradeHistoryModel.length;
    $rootScope.$apply();
    
    return service.dataLength;
  };
  
  service.getOutstandingPositions = function() {
    
  };
  
  service.profitRunningTotalPerDay = function() {
    var runningTotal = [];
    var currentTotal = null;
    
    var profits = service.profitLossPerDay()["profits"]
    profits = profits.reverse();
    
    for(var profit of profits) {
      if(currentTotal !== null) {
        currentTotal = profit + currentTotal;
      } else {
        currentTotal = profit;
      }
      runningTotal.push(currentTotal);
    }
    return runningTotal;
  }
  
  service.profitLossPerDay = function() {
    var profits = [];
    var dates = [];
    
    var previousDay = null;
    var currentDay = null;
    
    var currentDayObj = {};
    
    for (var trade of tradeHistoryModel) {
      if (currentDay == null) { // initialize previous day
        previousDay = trade['DateExecuted'].format('YYYY/MM/DD');
        currentDayObj["date"] = previousDay;
      }
      currentDay = trade['DateExecuted'].format('YYYY/MM/DD');
      
      if (currentDay !== previousDay) {
        // New Day
        profits.push(currentDayObj["profit"]);
        dates.push(currentDayObj["date"]);
        
        currentDayObj = {};
        previousDay = currentDay;
        
        currentDayObj["date"] = currentDay;
        currentDayObj["profit"] = trade['ProfitLoss'];
      } else {
        // Same Day
        currentDayObj["profit"] += trade['ProfitLoss'];
      }
      
    }
    if(currentDayObj["profit"]) {
      profits.push(currentDayObj["profit"]);
      dates.push(currentDayObj["date"]);
    }
    
    return {"profits": profits, "dates": dates};
  };
  
  
  return service;

}


export default ProfitLossService;