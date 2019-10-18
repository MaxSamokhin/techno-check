import React from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import Header from './components/header/header.jsx';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import PrivateRoute from './components/private-route/private-route.jsx';
import LoginPage from './page/login/login.page.jsx';
import NotFound from './components/not-found/not-found.jsx';
import {Toast} from 'material-ui-toast-redux';
import './app.less';
import SelectionHomePage from './page/selection-home/selection-home.page.jsx';
import SelectionPage from './page/selection/selection.page.jsx';
import UsersPage from './page/users/users.page.jsx';
import TestPage from './page/test/test.page.jsx';
import CategoryPage from './page/category/category.page.jsx';
import QuestionPage from './page/question/question.page.jsx';
import TestHomePage from './page/test-home/test-home.page.jsx';
import ResultHomePage from './page/result-home/result-home.page.jsx';
import ResultPage from './page/result/result.page.jsx';
import ReviewHomePage from './page/review-home/review-home.page.jsx';
import ReviewPage from './page/review/review.page.jsx';
import {LOG_IN} from './constant/routes-map.constant';


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            isLoadingSelectionHome,
            isLoadingSelection,
            isLoadingSelectionTest,
            isLoadingTestHome,
            isLoading,
            isLoadingTest,
            isLoadingCategories,
            isLoadingCategory,
            isLoadingQuestions,
            isLoadingQuestion,
            isLoadingAnswers,
            isLoadingMenu,
            isAuth
        } = this.props;

        return (
            <React.Fragment>
                {isAuth && <Header/>}

                <Switch>
                    <PrivateRoute exact path='/admin' component={SelectionHomePage}/>
                    <PrivateRoute exact path='/admin/selection/' component={SelectionPage}/>
                    <PrivateRoute exact path='/admin/selection/:selectionId' component={SelectionPage}/>

                    <PrivateRoute exact path='/admin/users/:selectionId' component={UsersPage}/>

                    <PrivateRoute exact path='/admin/tests/' component={TestHomePage}/>
                    <PrivateRoute exact path='/admin/test/' component={TestPage}/>
                    <PrivateRoute exact path='/admin/test/:testId' component={TestPage}/>

                    <PrivateRoute exact path='/admin/category/:categoryId' component={CategoryPage}/>
                    <PrivateRoute exact path='/admin/category/' component={CategoryPage}/>

                    <PrivateRoute exact path='/admin/question/:questionId' component={QuestionPage}/>
                    <PrivateRoute exact path='/admin/question/' component={QuestionPage}/>


                    <PrivateRoute exact path='/admin/result/' component={ResultHomePage}/>
                    <PrivateRoute exact path='/admin/result/:selectionId' component={ResultPage}/>

                    <PrivateRoute exact path='/admin/review/' component={ReviewHomePage}/>
                    <PrivateRoute exact path='/admin/review/:selectionId' component={ReviewPage}/>

                    <Route path='/admin/login' component={LoginPage}/>

                    <Route component={NotFound}/>
                </Switch>

                {
                    (
                        isLoadingSelectionHome ||
                        isLoadingSelection ||
                        isLoadingSelectionTest ||
                        isLoadingTestHome ||
                        isLoading ||
                        isLoadingTest ||
                        isLoadingCategories ||
                        isLoadingCategory ||
                        isLoadingQuestions ||
                        isLoadingQuestion ||
                        isLoadingAnswers ||
                        isLoadingMenu
                    ) &&
                    <div className='app__loading'>
                        <CircularProgress className={'app__loading-loader'} color='secondary'/>
                        <div className='app__loading-background'></div>
                    </div>
                }

                <Toast anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}/>

                {
                    (!isAuth) ? <Redirect to={LOG_IN}/> : ''
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoadingSelectionHome: state.selectionHome.isLoadingSelectionHome,
        isLoadingSelection: state.selection.isLoadingSelection,
        isLoadingSelectionTest: state.selection.isLoadingSelectionTest,
        isLoadingTestHome: state.testHome.isLoadingTestHome,
        isLoading: state.login.isLoading,
        isLoadingTest: state.test.isLoadingTest,
        isLoadingCategories: state.test.isLoadingCategories,
        isLoadingCategory: state.category.isLoadingCategory,
        isLoadingQuestions: state.category.isLoadingQuestions,
        isLoadingQuestion: state.question.isLoadingQuestion,
        isLoadingAnswers: state.question.isLoadingAnswers,
        isLoadingMenu: state.menu.isLoadingMenu,
        isAuth: state.login.isAuth,
    };
};

export default withRouter(connect(mapStateToProps)(App));
