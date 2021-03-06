import React from 'react';
import {connect} from 'react-redux';
import Popup from 'reactjs-popup';
// import Button from './../button/button.jsx';
import './question-popup.less';

import {
    getQuestion,
    changeQuestion,
    deleteItem,
    addItem,
    changeTitle,
    changeType,
    changeAnswerItem,
    changeScoreItem,
    setEmptyQuestion,
    saveQuestion,
    setAnswer
} from '../../actions/question.action.js';

import {
    getInquirer
} from '../../actions/inquirer.action.js';

import Question from '../../components/question/question.jsx';
import {generateId} from '../../service/generate-id';

class QuestionPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    componentDidMount() {
        const {getQuestion, setEmptyQuestion} = this.props;
        const {categoryId, questionId} = this.props;
        questionId ? getQuestion(questionId, categoryId) : setEmptyQuestion();

        console.log('questionId', questionId);

    }

    openPopup() {
        this.setState({ open: true });
    }
 
    closePopup() {
        this.setState({ open: false });
    }

    render() {
        let {categoryId, questionId} = this.props;
        questionId = questionId ? questionId : generateId();

        const {
            changeQuestion,
            addItem,
            questionTitle,
            questionType,
            answers,
            deleteItem,
            changeTitle,
            changeType,
            changeAnswerItem,
            changeScoreItem,
            saveQuestion,
            setAnswer,
            checkManual
        } = this.props;

        return <Popup
                modal
                trigger={this.props.trigger}
                open={this.state.open}
                onOpen={this.openPopup}
                disabled={this.props.isDisabled}
                position='top center'
                lockScroll
                contentStyle={{width: '100%'}}
                >
                <Question
                    questionTitle={questionTitle}
                    questionType={questionType}
                    answers={answers}
                    handleChangeQuestion={changeQuestion}
                    categoryId={categoryId}
                    questionId={questionId}
                    handleAddItem={addItem}
                    handleDeleteItem={deleteItem}
                    handleChangeTitle={changeTitle}
                    handleChangeType={changeType}
                    handleChangeAnswerItem={changeAnswerItem}
                    handleChangeScoreAnswer={changeScoreItem}
                    handleSaveQuestion={(questionId, categoryId, data) => saveQuestion(questionId, categoryId, data)}
                    handleSetAnswers={setAnswer}
                    checkManual={checkManual}
                    closePopup={this.closePopup}
                    updateQuestions={this.props.updateQuestions}
                />
            </Popup>
        ;
    }
}

function mapStateToProps(state) {
    return {
        questionTitle: state.question.questionTitle,
        questionType: state.question.questionType,
        answers: state.question.answers,
        errorMsgQuestion: state.question.errorMsgQuestion,
        isLoadingQuestion: state.question.isLoadingQuestion,
        checkManual: state.question.checkManual
    };
}

const mapDispatchToProps = (dispatch) => ({
    getQuestion: (questionId, categoryId) => dispatch(getQuestion(questionId, categoryId)),
    changeQuestion: (questionId, categoryId, data) => dispatch(changeQuestion(questionId, categoryId, data)),
    saveQuestion: (questionId, categoryId, data) => dispatch(saveQuestion(questionId, categoryId, data)),
    addItem: (questionId, categoryId, answerId) => dispatch(addItem(questionId, categoryId, answerId)),
    deleteItem: (questionId, categoryId, answerId) => dispatch(deleteItem(questionId, categoryId, answerId)),
    changeTitle: e => dispatch(changeTitle(e)),
    changeType: e => dispatch(changeType(e)),
    changeAnswerItem: (e, value) => dispatch(changeAnswerItem(e, value)),
    changeScoreItem: (e, value) => dispatch(changeScoreItem(e, value)),
    setEmptyQuestion: () => dispatch(setEmptyQuestion()),
    setAnswer: data => dispatch(setAnswer(data)),
    updateQuestions: () => dispatch(getInquirer())
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPopup);
