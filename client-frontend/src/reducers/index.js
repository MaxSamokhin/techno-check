import {combineReducers} from 'redux';
import test from './test.reducer';
import question from './question.reducer';
import user from './user.reducer.js';

export default combineReducers({
    test,
    question,
    user
});
