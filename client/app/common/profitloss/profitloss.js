import angular from 'angular';
import profitlossComponent from './profitloss.component';
import ProfitLossService from './profitloss.service';
import 'angular-chart.js';

let profitlossModule = angular.module('profitloss', [
  'chart.js'
])

.component('profitloss', profitlossComponent)
.service('ProfitLossService', ProfitLossService)
.name;

export default profitlossModule;
