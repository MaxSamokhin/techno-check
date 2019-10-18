import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import TestExpansionPanel from './../../components/test-expansion-panel/test-expansion-panel.jsx';
import Specification from './../../components/specification/specification.jsx';

import './home.page.less';
// import {getString} from '../../service/get-string';
// import Http from '../../service/http';
import {setFinishTest} from '../../actions/question.action';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const specBlock = this.getSpec();
        const testBlock = this.getTest();

        return (
            <section className='home'>
                <div className='home__specification'>
                    {specBlock}
                </div>

                <div className='home__selection-description'>
                    <ReactMarkdown source={'**Описание** н*а*бора'}/>
                </div>

                <div className='home__test'>
                    {testBlock}
                </div>
            </section>
        );
    }

    getTest() {
        const tests = this.props.userTests;
        // const {finishedTests} = this.props;

        return (
            tests.map(({userTestId, testTitle, timeLimit}) => {

                console.log('HomePage', userTestId, timeLimit);
                var isDisabled = false;
                for (const t in tests) { // TODO: replace this shitty way to check test finishing.
                    if ((tests[t].userTestId === userTestId) && (tests[t].testStatus === 'FINISHED')
                        || this.props.finishedTests.includes('' + userTestId)) {
                        isDisabled = true;
                    }
                }

                return (
                    <div className='home__test-button' key={userTestId}>
                        <TestExpansionPanel
                            userTests={tests}
                            userTestId={userTestId}
                            title={testTitle}
                            timeLimit = {timeLimit}
                            isDisabled={isDisabled}
                            >
                        </TestExpansionPanel>
                    </div>
                );
            }));
    }

    getSpec() {
        const {dateStart, dateEnd, selectionTitle} = this.props;

        const [date, time] = [dateStart.split('T')[0], dateStart.split('T')[1]];
        const [dateFinish, timeFinish] = [dateEnd.split('T')[0], dateEnd.split('T')[1]];

        return (
            <Specification
                dateStart={[date, time]}
                dateEnd={[dateFinish, timeFinish]}
                title={selectionTitle}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        userTests: state.user.userTests,
        dateEnd: state.user.dateEnd,
        dateStart: state.user.dateStart,
        selectionTitle: state.user.selectionTitle,
        finishedTests: state.question.finishedTests
    };
}

// const mapDispatchToProps = dispatch => ({
//     // startTest: (testId) => dispatch(startTest(testId))

// });
const mapDispatchToProps = {
    setFinishTest: setFinishTest
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

HomePage.propTypes = {
    userTests: PropTypes.array,
    // startTest: PropTypes.func
};
