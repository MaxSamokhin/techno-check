import React from 'react';
import {Switch, Route} from 'react-router-dom';
import 'react-dates/initialize';

import InquirerPage from './page/inquirer/inquirer.page.jsx';
import ReviewPage from './page/review/review.page.jsx';
import ResultPage from './page/result/result.page.jsx';
import LoginPage from './page/login/login.page.jsx';
import NotFound from './components/not-found/not-found.jsx';

import Header from './components/header/header.jsx';
import QuestionPage from './page/question/question.page.jsx';

import PrivateRoute from './components/private-route/private-route.jsx';

const App = () => (
    <React.Fragment>

        <Header/>

        {/*<div className='content'>*/}
            <Switch>`

                <PrivateRoute exact path='/admin/' component={InquirerPage}/>
                <PrivateRoute path='/admin/review' component={ReviewPage}/>
                <PrivateRoute path='/admin/result' component={ResultPage}/>

                <PrivateRoute exact path='/admin/question/:categoryId/:questionId' component={QuestionPage}/>
                <PrivateRoute exact path='/admin/question/:categoryId' component={QuestionPage}/>

                <Route path='/admin/login' component={LoginPage}/>
                <Route component={NotFound}/>

            </Sw`itch>
        {/*</div>*/}

    </React.Fragment>
);

export default App;
