import {combineReducers} from 'redux';
import tests from 'redux/test/test.reducer.js';
import grouping from 'redux/grouping/grouping.reducer.js';
import login from 'redux/login/login.reducer.js';
import questions from 'redux/question/question.reducer.js';
import manipulation from 'redux/manipulation-data/manipulation-data.reducer.js';
import personalData from 'redux/personal-data/personal-data.reducer.js';

export default combineReducers({
   tests,
   grouping,
   login,
   questions,
   manipulation,
   personalData
});
