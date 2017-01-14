import angular from 'angular';
import Navbar from './navbar/navbar';
import ProfitLoss from './profitloss/profitloss';
import FileSelect from './fileselect/fileselect';
import User from './user/user';

let commonModule = angular.module('app.common', [
  Navbar,
  ProfitLoss,
  FileSelect,
  User
])
  
.name;

export default commonModule;
