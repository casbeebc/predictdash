import moment from 'moment';
import pouchdb from 'pouchdb';
import uuid from 'uuid/v1';
import pouchdbfind from 'pouchdb-find';

function ProfitLossService($rootScope) {
  'ngInject';
  this.name = "profitloss.service";
  var serviceID = uuid();
  var tradeHistoryModel = [];
  var profitlossPerDay = {};
  
  const service = {};

  pouchdb.plugin(pouchdbfind);
  var db = new pouchdb('tradeHistory', {adapter : 'websql'});
  
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
    profitlossPerDay = {};
    for(var trade of tradeHistoryModel) {
      trade['CreditDebit'] = convertToNumber(trade['CreditDebit']);
      trade['Fees'] = convertToNumber(trade['Fees']);
      trade['Price'] = convertToNumber(trade['Price']);
      trade['ProfitLoss'] = convertToNumber(trade['ProfitLoss']);
      trade['Risk'] = convertToNumber(trade['Risk']);
      // example "1/05/2017 1:24 PM"
      trade['DateExecuted'] = moment(trade['DateExecuted'], "M/DD/YYYY h:mm A");
    }
    
    // Auto update existing document if called more than once
    db.get(serviceID).then(function(doc) {
      return db.put({
        _id: serviceID,
        _rev: doc._rev,
        "data": tradeHistoryModel
      });
    }).catch(function (err) {
      // initial load
      db.put({
        _id: serviceID,
        "data": tradeHistoryModel
      });
    });
    
    service.dataLength = tradeHistoryModel.length;
    $rootScope.$apply();
    
    return service.dataLength;
  };
  
  service.getOutstandingPositions = function() {
    
  };
  
  service.profitRunningTotalPerDay = function() {
    var runningTotal = [];
    var currentTotal = null;
    
    var profits = profitlossPerDay["profits"] || service.profitLossPerDay()["profits"];
    
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
    profitlossPerDay = {"profits": profits.reverse(), "dates": dates.reverse()};
    return profitlossPerDay;
  };
  
  
  return service;

}


export default ProfitLossService;