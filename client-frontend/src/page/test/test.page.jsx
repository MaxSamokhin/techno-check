import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Button from './../../components/button/button.jsx';
import LinkButton from './../../components/link-button/link-button.jsx';
import Specification from './../../components/specification/specification.jsx';

import './test.page.less';
import {startTest} from '../../actions/user.action';
import {getString} from '../../service/get-string.js';
import {Redirect} from 'react-router-dom';

class TestPage extends React.Component {
    constructor(props) {
        super(props);

        this.onClickStartTest = this.onClickStartTest.bind(this);
    }

    render() {
        const {userTests, questionId, finishedTests} = this.props;
        const {testId} = this.props.match.params;

        console.log(questionId);

        if (finishedTests.indexOf( getString(testId) ) !== -1) {
            return <Redirect to={'/'}/>;
        }

        if (questionId) {
            return <Redirect to={`/question/${testId}`}/>;
        }

        const testIndex = userTests.findIndex(({userTestId}) =>
            getString(userTestId) === getString(testId));

        console.log('getButtonStartBlock', userTests[testIndex]);

        const specBlock = this.getSpec(userTests[testIndex]);
        const buttonStartBlock = this.getButtonStartBlock(userTests[testIndex]);


        return (
            <div className='test-page'>
                <section className='test'>
                    <div className='test__start'>
                        <div className='test__start-title'>
                        </div>

                        <div className='test__start-button'>
                            {buttonStartBlock}
                        </div>
                    </div>

                    <div className='test__specification'>
                        {specBlock}
                    </div>
                </section>

                <div className='test-page__back-button'>
                    <LinkButton to={'/'} text='Назад'/>
                </div>
            </div>
        );
    }

    getButtonStartBlock({userTestId}) {
        return (
            <Button
                text={'Начать тестирование'}
                handleClick={this.onClickStartTest.bind(this, userTestId)}
            />
        );
    }

    onClickStartTest(userTestId) {
        const {startTest} = this.props;
        const testTitle = this.props.userTests.find(x => x.userTestId === userTestId).testTitle;
        startTest(userTestId, testTitle);
    }

    getSpec({testTitle, timeLimit}) {

        console.log('getSpec', timeLimit);

        return (
            <Specification
                title={testTitle}
                limitTime={timeLimit}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        userTests: state.user.userTests,
        questionId: state.question.questionId,
        finishedTests: state.question.finishedTests
    };
}

// const mapDispatchToProps = dispatch => ({
//     startTest: (testId) => dispatch(startTest(testId))
// });

const mapDispatchToProps = {
    startTest: startTest
};

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);

TestPage.propTypes = {
    startTest: PropTypes.func,
    userTests: PropTypes.any
};
