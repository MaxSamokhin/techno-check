import React from 'react';
import PropTypes from 'prop-types';
import {nextQuestion} from '../../actions/question.action';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';

import AnswerCheckbox from '../../components/answer/answer-checkbox/answer-checkbox.jsx';
import AnswerRadio from '../../components/answer/answer-radio/answer-radio.jsx';
import AnswerVideo from '../../components/answer/answer-video/answer-video.jsx';
import AnswerText from '../../components/answer/answer-text/answer-text.jsx';
import {Redirect} from 'react-router-dom';
import './question.page.less';
import ReactMarkdown from 'react-markdown';


class QuestionPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            blobVideo: null,
            selectedRadioValue: null,
            arrayCheckboxValue: [],
            textAnswer: '',

            timeRemain: 10,
            completed: 50
        };

        this.onClickAnswer = this.onClickAnswer.bind(this);
        this.setBlobVideo = this.setBlobVideo.bind(this);

        this.setSelectedRadioValue = this.setSelectedRadioValue.bind(this);
        this.setSelectedCheckboxValue = this.setSelectedCheckboxValue.bind(this);
        this.handleChangeTextAnswer = this.handleChangeTextAnswer.bind(this);
    }

    render() {
        const {questionTitle, questionType, questionAnswers, isFinishTest} = this.props;
        const {selectedRadioValue, arrayCheckboxValue, textAnswer} = this.state;

        if (isFinishTest) {
            return <Redirect to={'/'}/>;
        }

        console.log('questionTitle, questionType, questionAnswers: ', questionTitle, questionType, questionAnswers);

        const isDisabled = this.isDisabledButton();

        return (
            <section className='question'>
                <div className='question__main'>
                    <div className='question__header-title'>
                        <span className='question__inquirer-title'>{this.props.selectionTitle}</span>
                        <span className='question__test-title'>{'  ' + this.props.testTitle}</span>
                    </div>

                    <div className='question__title'>
                        <ReactMarkdown source={questionTitle}/>
                    </div>

                    <div className='question__text'>
                        <ReactMarkdown source={this.props.questionText}/>
                    </div>

                    <div className='question__content'>
                        {
                            questionType === 'MULTIPLE_TEST' && <AnswerCheckbox
                                questionAnswers={questionAnswers}
                                selectedValue={arrayCheckboxValue}
                                setAnswer={this.setSelectedCheckboxValue}
                                />
                        }
                        {
                            questionType === 'TEST' && <AnswerRadio
                                questionAnswers={questionAnswers}
                                setAnswer={this.setSelectedRadioValue}
                                selectedValue={selectedRadioValue}
                                />
                        }
                        {
                            questionType === 'VIDEO' && <AnswerVideo
                                setVideo={this.setBlobVideo}
                                />
                        }
                        {
                            questionType === 'TEXT' && <AnswerText
                                textAnswer={textAnswer}
                                handleChangeTextAnswer={this.handleChangeTextAnswer}
                                />
                        }
                    </div>

                    <div className='question__button'>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            onClick={this.onClickAnswer}
                            disabled={isDisabled}
                            >
                            {'Ответить'}
                        </Button>
                    </div>
                </div>

            </section>
        );
    }

    handleChangeTextAnswer(e) {
        console.log('handleChangeTextAnswer', e.target.value);
        this.setState({textAnswer: e.target.value});
    }

    isDisabledButton() {
        const {blobVideo, arrayCheckboxValue, selectedRadioValue, textAnswer} = this.state;

        if (selectedRadioValue) {
            return false;
        }

        return !(!!blobVideo || !!arrayCheckboxValue.length || !!textAnswer);
    }

    setSelectedRadioValue(e) {
        console.log('selectedRadioValue', e.target);
        this.setState({selectedRadioValue: e.target.value});
    }

    setSelectedCheckboxValue(e) {
        const value = +e.target.value;
        const checkboxValues = this.state.arrayCheckboxValue;

        console.log('setSelectedCheckboxValue checkboxValues, value', checkboxValues, value);

        const indexValue = checkboxValues.indexOf(value);
        if (indexValue !== -1) {
            checkboxValues.splice(indexValue, 1);
        } else {
            checkboxValues.push(value);
        }

        console.log('setSelectedCheckboxValue arrayCheckboxValue:', this.state.arrayCheckboxValue);

        this.setState({arrayCheckboxValue: checkboxValues});
    }

    setBlobVideo(blob) {
        this.setState({blobVideo: blob});
    }

    onClickAnswer() {
        console.log('onClickAnswer');

        const {blobVideo, selectedRadioValue, arrayCheckboxValue, textAnswer} = this.state;
        const {questionId, questionType} = this.props;
        const {testId} = this.props.match.params;

        let multiplyAnswer = undefined;
        let textAnswerRequest = undefined;
        let testAnswer = undefined;
        let data = null;

        switch (questionType) {
            case 'TEXT':
                textAnswerRequest = textAnswer;
                break;
            case 'VIDEO':
                data = blobVideo;
                break;
            case 'MULTIPLE_TEST':
                multiplyAnswer = arrayCheckboxValue.map(elem => +elem);
                break;
            case 'TEST': {
                testAnswer = selectedRadioValue;
                break;
            }
        }

        console.log('testId, TEXT, MULTIPLE_TEST, TEST, data', testId, textAnswerRequest, multiplyAnswer, testAnswer, data);

        this.props.nextQuestion(testId, questionId, {multiplyAnswer, textAnswerRequest, testAnswer});
        this.setState({selectedRadioValue: null, textAnswer: ''});
    }
}

function mapStateToProps(state) {
    return {
        questionId: state.question.questionId,
        questionTitle: state.question.questionTitle,
        questionText: state.question.questionText,
        questionType: state.question.questionType,
        questionAnswers: state.question.questionAnswers,
        isLoadingQuestion: state.question.isLoadingQuestion,
        isFinishTest: state.question.isFinishTest,
        selectionTitle: state.user.selectionTitle,
        testTitle: state.test.currentTestTitle
    };
}

const mapDispatchToProps = dispatch => ({
    nextQuestion: (testId, questionId, {multiplyAnswer, textAnswerRequest, testAnswer}) =>
        dispatch(nextQuestion(testId, questionId, {multiplyAnswer, textAnswerRequest, testAnswer}))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);

QuestionPage.propTypes = {
    questionId: PropTypes.any,
    questionTitle: PropTypes.string,
    questionType: PropTypes.string,
    questionAnswers: PropTypes.array,
    isLoadingQuestion: PropTypes.bool,
    nextQuestion: PropTypes.func
};
