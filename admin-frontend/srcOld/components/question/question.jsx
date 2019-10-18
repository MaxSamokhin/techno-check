import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import AnswersText from '../answers/answers-text/answer-text.jsx';
import AnswersItem from '../answers/answers-item/answers-item.jsx';
import Button from '../button/button.jsx';
import {generateId} from '../../service/generate-id';
import { toast } from 'react-toastify';
import Checkbox from '../../components/checkbox/checkbox.jsx';
import ReactMde from 'react-mde';
import Showdown from 'showdown';
import Select from '../select/select.jsx';

import 'react-mde/lib/styles/css/react-mde-all.css';
import 'draft-js/dist/Draft.css';

import {
    MULTIPLE_TEST,
    TEXT,
    TEST
} from '../../constants/questyon.type';

import './question.less';
import {
    isValidQuestion,
    isValidScore,
    isValidAnswerItem
} from '../../service/validator';
// import QuestionHeader from './question-header/question-header.jsx';

import {
    changeTitle,
    changeType,
    changeCheckbox,
    getQuestion,
    setEmptyQuestion,
} from '../../actions/question.action.js';

class Question extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // redirect: false,
        };

        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
        });

        this.clickAddQuestion = this.clickAddQuestion.bind(this);
        this.clickSaveQuestion = this.clickSaveQuestion.bind(this);
        
        const {getQuestion, setEmptyQuestion} = this.props;
        const {categoryId, questionId} = this.props;
        console.log('questionId', questionId, categoryId);
        questionId ? getQuestion(questionId, categoryId) : setEmptyQuestion();
    }

    handleValueChange = (value) => {
        this.setState({ value });
        this.props.changeTitle(value);
    };

    render() {
        const {
            questionTitle,
            questionType,
            answers,
            handleAddItem,
            handleDeleteItem,
            categoryId,
            questionId,
            // handleChangeTitle,
            handleChangeType,
            handleChangeAnswerItem,
            handleChangeScoreAnswer,
        } = this.props;
        // const {redirect} = this.state;

        // if (this.state.redirect) {
            // {return <Redirect to={INQUIRER}/>;}
        // }
        console.log('Question questionTitle', questionTitle);
        return (
            <div className='question'>

                <header className='question-header'>
                    <div className='question-header__input'>
                        <span className='question-header__title-label'>Введите вопрос:</span>
                        <ReactMde
                            value={questionTitle}
                            onChange={this.handleValueChange}
                            generateMarkdownPreview={markdown =>
                                Promise.resolve(this.converter.makeHtml(markdown))
                            }
                            l18n={{write: 'Редактор', preview: 'Превью'}}
                        />
                    </div>

                    <div className='question-header__select'>
                        <Select
                            options={[
                                {
                                    label: 'Вопрос с одним ответом',
                                    value: TEST
                                },
                                {
                                    label: 'Вопрос с несколькими ответами',
                                    value: MULTIPLE_TEST
                                },
                                {
                                    label: 'Текстовый вопрос',
                                    value: TEXT
                                },
                                // {
                                //     label: 'Видео вопрос',
                                //     value: VIDEO
                                // }
                            ]}
                            handleSelect={handleChangeType}
                            typeSelect={questionType}
                        />
                    </div>

                    {
                        questionType === TEXT &&
                        <Checkbox
                            label={'Проверить ответы вручную'}
                            checkboxValue={'checkManual'}
                            isChecked={this.props.checkManual}
                            handleOnChange={this.props.changeCheckbox}
                        />
                    }
                </header>
                
                <main className='question__main'>
                    {
                        questionType === TEXT && !this.props.checkManual && <AnswersText
                            handleChangeAnswerItem={handleChangeAnswerItem}
                            handleChangeScoreAnswer={handleChangeScoreAnswer}
                            answerTitle={answers[0].answerTitle}
                            answerScore={answers[0].answerScore}
                            answerId={answers[0].answerId}
                        />
                    }
                    {
                        (questionType === TEST || questionType === MULTIPLE_TEST) &&
                        <AnswersItem
                            answers={answers}
                            handleAddItem={handleAddItem}
                            handleDeleteItem={handleDeleteItem}
                            categoryId={categoryId}
                            questionId={questionId}
                            handleChangeAnswerItem={handleChangeAnswerItem}
                            handleChangeScoreAnswer={handleChangeScoreAnswer}
                        />
                    }

                <section className='question__buttons'>
                    <div className='question__buttons-button'>
                        {
                            (questionType === TEST || questionType === MULTIPLE_TEST) &&
                            <Button
                                text={'Добавить вариант ответа'}
                                style={'default'}
                                handleClick={this.clickAddQuestion}
                            />
                        }
                    </div>

                    <div className='question__buttons-button'>
                        <Button
                            text={'Сохранить'}
                            style={'success'}
                            handleClick={this.clickSaveQuestion}
                        />
                    </div>
                </section>
                </main>
            </div>
        );
    }

    clickSaveQuestion() {
        const {
            handleChangeQuestion,
            handleSaveQuestion,
            categoryId,
            questionId,
            questionTitle,
            questionType,
            answers,
            checkManual
        } = this.props;

        if (!isValidQuestion(questionTitle, questionType, answers)) {
            toast.error('Введите вопрос и варианты ответа');
            return;
        }

        if (questionType === TEST || questionType === MULTIPLE_TEST) {
            if (answers.length <= 1) {
                toast.error('Должно быть несколько ответов');
                return;
            }
        }

        if (!isValidScore(answers)) {
            toast.error('Балл должен быть заполнен и не может быть меньше 0 и больше 10');
            return;
        }

        if (questionType !== TEXT && !isValidAnswerItem(answers)) {
            toast.error('Значения ответов должны быть заполены');
            return;
        }

        console.log('clickSaveQuestion checkManual', answers, questionType, questionTitle, checkManual);

        console.log('@@@', questionType);
        if (String(questionId).substr(0, 1) === '_') {
            handleSaveQuestion(questionId, categoryId, {
                questionTitle,
                questionType,
                answers,
                checkManual // TODO: not work!
            });

            // this.setState({redirect: true});
            this.props.closePopup();
            setTimeout(this.props.updateQuestions, 500);  // This is a shittiest thing that I made today, but it doesn't work otherwise. TODO: kill me for that.
            return;
        }

        console.log('clickSaveQuestion clickSaveQuestion clickSaveQuestion', answers);

        handleChangeQuestion(questionId, categoryId, {
            questionTitle,
            questionType,
            answers,
            checkManual
        });

        // this.setState({redirect: true});
        this.props.closePopup();    
    }

    clickAddQuestion() {
        const {categoryId, questionId, handleAddItem} = this.props;
        handleAddItem(questionId, categoryId, generateId());
    }
}

Question.propTypes = {
    questionTitle: PropTypes.string,
    questionType: PropTypes.string,
    answers: PropTypes.any,
    handleChangeQuestion: PropTypes.func,
    categoryId: PropTypes.any,
    questionId: PropTypes.any,
    handleAddItem: PropTypes.func,
    handleDeleteItem: PropTypes.func,
    handleChangeTitle: PropTypes.func,
    handleChangeType: PropTypes.func,
    handleChangeAnswerItem: PropTypes.func,
    handleChangeScoreAnswer: PropTypes.func,
    handleSaveQuestion: PropTypes.func,
    handleSetAnswers: PropTypes.func,
    checkManual: PropTypes.bool
};

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
    changeTitle: e => dispatch(changeTitle(e)),
    getQuestion: (questionId, categoryId) => dispatch(getQuestion(questionId, categoryId)),
    setEmptyQuestion: () => dispatch(setEmptyQuestion()),
    changeType: e => dispatch(changeType(e)),
    changeCheckbox: e => dispatch(changeCheckbox(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
