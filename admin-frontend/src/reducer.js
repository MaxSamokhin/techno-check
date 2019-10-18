import {combineReducers} from 'redux';
import selection from './page/selection/selection.reducer.js';
import users from './page/users/users.reducer.js';
import test from './page/test/test.reducer.js';
import category from './page/category/category.reducer.js';
import question from './page/question/question.reducer.js';
import selectionHome from './page/selection-home/selection-home.reducer.js';
import login from './page/login/login.reducer.js';
import testHome from './page/test-home/test-home.reducer.js';
import {reducer as toast} from 'material-ui-toast-redux';
import menu from './components/menu/menu.reducer';
import result from './page/result/result.reducer';
import reviewHome from './page/review-home/review-home.reducer';
import review from './page/review/review.reducer';
import routeNavigation from './components/route/route.reducer';
import statistic from './components/statistic/statistic.reducer';
import typeQuestionService from './components/type-question-service/type-question-service.reducer';

export default combineReducers({
    selectionHome,
    testHome,
    login,
    selection,
    menu,
    result,
    users,
    test,
    category,
    question,
    reviewHome,
    review,
    routeNavigation,
    statistic,
    typeQuestionService,
    toast
});
