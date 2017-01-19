import angular from 'angular';
import profitlossComponent from './profitloss.component';
import ProfitLossService from './profitloss.service';
import 'angular-chart.js';
import 'chartjs-plugin-zoom';

let profitlossModule = angular.module('profitloss', [
  'chart.js'
])

.component('profitloss', profitlossComponent)
.service('ProfitLossService', ProfitLossService)
.name;

export default profitlossModule;
