import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// import Header from './components/header/header.jsx';
import NotFound from './components/not-found/not-found.jsx';
import HomePage from './page/home/home.page.jsx';
import TestPage from './page/test/test.page.jsx';
import QuestionPage from './page/question/question.page.jsx';
import AuthPage from './page/auth/auth.page.jsx';
// import LinkButton from './components/link-button/link-button.jsx';
import PrivateRouter from './components/private-router/private-route.jsx';

import './app.less';

const App = () => (
    <React.Fragment>
        {/*<div className='content'>*/}
            {/*<Header/>*/}

            <div className='content__main'>
                <Card>
                    <CardContent>
                        <Switch>
                            <PrivateRouter exact path='/' component={HomePage}/>
                            <PrivateRouter exact path='/test/:testId' component={TestPage}/>
                            <PrivateRouter exact path='/question/:testId' component={QuestionPage}/>
                            <Route exact path='/auth/:token' component={AuthPage}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </CardContent>
                </Card>
            </div>
            {/*<LinkButton*/}
                {/*text={'ссылка на почте'}*/}
                {/*to={'/auth/8a6ef342dda42835a34f2e504f8a1525'}*/}
            {/*/>*/}
        {/*</div>*/}
    </React.Fragment>
);

export default App;
