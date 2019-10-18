import React from 'react';
import {connect} from 'react-redux';
import {
    createQuestion,
    deleteAnswer,
    deleteQuestion,
    getAnswers,
    getQuestionInfo,
    saveAnswers,
    saveQuestion
} from './question.action';
import './question.page.less';
import {withToast} from 'material-ui-toast-redux';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'react-mde/lib/styles/css/react-mde-all.css';

import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import xssFilter from 'showdown-xss-filter';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MenuTree from '../../components/menu/menu.jsx';
import {getMenuData} from '../../components/menu/menu.action';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import IconButton from '@material-ui/core/IconButton';
import {CATEGORY} from '../../constant/routes-map.constant';
import {toast} from 'react-toastify';
import Radio from '@material-ui/core/Radio';
import DeleteDialog from '../../components/delete-dialog/delete-dialog.jsx';

class QuestionPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questionId: -1,
            questionTitle: '',
            questionType: '',
            questionManualCheck: false,

            questionText: '', // описание вопроса.
            questionAnswers: [{
                answerId: this.generateId(),
                answerScore: 0,
                answerTitle: '',
                answerIsCorrect: false,
            }],
            type: '',

            isPageCreateQuestion: false,
            redirectToCategory: false,
            fromTestHomePage: false,

            tab: 'write',
            openCloseDeleteDialog: false
        };

        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true,
            extensions: [xssFilter]
        });
    }

    componentDidMount() {
        const {getQuestionInfo, getAnswers} = this.props;
        const {questionId} = this.props.match.params;

        if (!questionId) {
            this.setState((state) => {
                return {
                    ...state,
                    isPageCreateQuestion: true
                };
            });
            return;
        } else {
            this.setState({isPageCreateQuestion: false});
        }

        getQuestionInfo(questionId);
        getAnswers(questionId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.hasOwnProperty('questionId') &&
            this.props.match.params.questionId !== prevProps.match.params.questionId
        ) {
            const {getQuestionInfo, getAnswers} = this.props;
            const {questionId} = this.props.match.params;

            getQuestionInfo(questionId);
            getAnswers(questionId);
        }

        if (this.props.question !== prevProps.question ||
            this.props.questionAnswers !== prevProps.questionAnswers ||
            this.props.questionAnswers.some((elem, i) => elem !== prevProps.questionAnswers[i]) ||
            this.props.redirectToCategory !== prevProps.redirectToCategory ||
            this.props.fromTestHomePage !== prevProps.fromTestHomePage
        ) {

            const {questionId, questionTitle, questionText, questionType, questionManualCheck} = this.props.question || {
                questionId: -1,
                questionTitle: '',
                questionType: '',
                questionManualCheck: false
            };
            const questionAnswers = this.props.questionAnswers || [];
            const {redirectToCategory, fromTestHomePage} = this.props;

            if (!!questionId || !!questionTitle) {
                this.setState({isPageCreateQuestion: false});
            } else {
                this.setState({isPageCreateQuestion: true});
            }

            console.log('componentDidUpdate', questionId, questionAnswers);

            this.setState((state) => {
                return {
                    ...state,
                    questionAnswers,
                    questionId,
                    questionTitle,
                    questionType,
                    fromTestHomePage,
                    questionText,
                    redirectToCategory,
                    questionManualCheck
                };
            });
        }
    }

    render() {
        const {
            questionTitle,
            questionText,
            questionAnswers,
            questionType,
            redirectToCategory,
        } = this.state;

        if (redirectToCategory) {
            return <Redirect to={`${CATEGORY}${this.props.category.categoryId}`}/>;
        }

        console.log('render');
        console.log(questionType, questionAnswers);

        return (<div className='question'>
            {
                questionType !== 'TEXT' && <Fab color='primary'
                                                aria-label='Add'
                                                className={'question__icon'}
                                                disabled={!!questionAnswers.length &&
                                                questionAnswers[questionAnswers.length - 1].hasOwnProperty('answerTitle') &&
                                                questionAnswers[questionAnswers.length - 1].answerTitle === ''}
                                                onClick={this.handleClickAddAnswer}>
                    <AddIcon/>
                </Fab>
            }
            {
                <nav className='question__menu'>
                    <MenuTree
                        selectionId={this.props.selection && this.props.selection.hasOwnProperty('selectionId') && this.props.selection.selectionId}
                        testId={this.props.test && this.props.test.hasOwnProperty('testId') && this.props.test.testId}
                    />
                </nav>
            }

            <div className='question__container'>
                <form className='question__form _base-info'>
                    <div className='question__form-row'>
                        <TextField
                            value={questionTitle}
                            onChange={this.handleTitleQuestionChange}
                            id='standard-full-width'
                            label='Вопрос'
                            placeholder='Введите вопрос'
                            fullWidth
                            className={'question__form-label'}
                            margin='normal'
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <IconButton aria-label='DeleteTest'
                                    onClick={this.handleOpenDeleteDialog}
                                    className={'test__test-row-icon-wrapper'}>
                            <DeleteForeverOutlinedIcon
                                className={'test__test-row-icon'}/>
                        </IconButton>
                    </div>

                    <FormControl>
                        <InputLabel shrink htmlFor='questionType-label-placeholder' className={'question__form-label'}>
                            Тип вопроса
                        </InputLabel>
                        <Select
                            className={'question__form-select'}
                            value={this.state.questionType}
                            onChange={this.handleChangeSelectType}
                            input={<Input name='questionType' id='questionType-label-placeholder'/>}
                            displayEmpty
                            name='questionType'>

                            <MenuItem value={'TEST'}>Вопрос с одним вариантом ответа</MenuItem>
                            <MenuItem value={'MULTIPLE_TEST'}>Вопрос с несколькими вариантами ответа</MenuItem>
                            <MenuItem value={'TEXT'}>Вопрос с текстовым ответом</MenuItem>

                        </Select>
                    </FormControl>

                    <span className='question__label'>Текст вопроса</span>

                    <ReactMde
                        className={'question__markdown'}
                        value={questionText}
                        onChange={this.handleMarkdownChange}
                        generateMarkdownPreview={markdown =>
                            Promise.resolve(this.converter.makeHtml(markdown))
                        }
                        l18n={{write: 'Редактор', preview: 'Превью'}}
                        minEditorHeight={100}
                        maxEditorHeight={160}
                    />
                </form>


                <div className='question__answers-wrapper'>
                    {
                        questionType !== 'TEXT' && <section className='question__answers'>
                            {
                                !!questionAnswers && questionAnswers.map((answer, index) => (
                                    <div className='question__answers-item'
                                         key={answer.answerId || index}>
                                        <span className='question__label'>Текст ответа</span>

                                        <div className='question__answers-item-row'>
                                            <div className='question__answers-item-col'>
                                                <ReactMde
                                                    className={'question__markdown'}
                                                    value={answer.answerTitle}
                                                    onChange={this.handleMarkdownAnswerChange.bind(this, answer.answerId || index)}
                                                    generateMarkdownPreview={markdown =>
                                                        Promise.resolve(this.converter.makeHtml(markdown))
                                                    }
                                                    l18n={{write: 'Редактор', preview: 'Превью'}}
                                                    minEditorHeight={100}
                                                    maxEditorHeight={160}
                                                    onTabChange={this.handleTabChange}
                                                    selectedTab={this.state.tab}
                                                />

                                                {
                                                    questionType === 'MULTIPLE_TEST' && <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={answer.answerIsCorrect}
                                                                onChange={this.handleCorrectAnswersChange.bind(this, answer.answerId || index)}
                                                                color='primary'
                                                            />
                                                        }
                                                        label='Это корректный ответ'
                                                    />
                                                }

                                                {
                                                    questionType === 'TEST' && <FormControlLabel
                                                        control={
                                                            <Radio
                                                                checked={answer.answerIsCorrect}
                                                                onChange={this.handleCorrectAnswersChange.bind(this, answer.answerId || index)}
                                                            />
                                                        }
                                                        label='Это корректный ответ'
                                                    />

                                                }
                                            </div>

                                            <IconButton aria-label='DeleteTest'
                                                        onClick={this.handleDeleteAnswers.bind(this, answer.answerId || index)}
                                                        className={'test__test-row-icon-wrapper'}>
                                                <DeleteForeverOutlinedIcon
                                                    className={'test__test-row-icon'}/>
                                            </IconButton>
                                        </div>
                                    </div>))
                            }

                        </section>
                    }
                    <Button className={'question__button'}
                            variant='contained'
                            size='medium'
                            color='primary'
                            onClick={this.saveAllDataQuestion}>
                        Сохранить
                    </Button>
                </div>
            </div>


            <DeleteDialog
                open={this.state.openCloseDeleteDialog}
                onClose={this.handleCloseDeleteDialog}
                onConfirm={this.handleDeleteQuestion}
                />
        </div>);
    }

    handleCloseDeleteDialog = () => {
        this.setState({openCloseDeleteDialog: false});
    };

    handleOpenDeleteDialog = () => {
        this.setState({openCloseDeleteDialog: true});
    };

    handleTabChange = (tab) => {
        this.setState({tab});
    };

    handleCorrectAnswersChange = (answerId) => {
        const {questionAnswers, questionType} = this.state;
        const index = questionAnswers.findIndex(elem => elem.answerId === answerId);

        let newQuestionAnswers = questionType === 'MULTIPLE_TEST' ? [...questionAnswers] : questionAnswers.map((elem) => {
            elem.answerIsCorrect = false;
            return elem;
        }, []);

        newQuestionAnswers[index].answerIsCorrect = !newQuestionAnswers[index].answerIsCorrect;

        this.setState({questionAnswers: newQuestionAnswers});
    };

    handleDeleteQuestion = () => {
        const {selection, getMenuData, deleteQuestion} = this.props;
        const {questionId} = this.state;

        deleteQuestion(questionId);
        setTimeout(() => {
            if (selection && selection.hasOwnProperty('selectionId') && selection.selectionId) {
                getMenuData(selection.selectionId);
            }
        }, 100); // подумать как убрать - по завершению setTestExisting
        this.handleCloseDeleteDialog();
    };

    validate() {
        const {questionTitle, questionType, questionText, questionAnswers} = this.state;

        if (!questionTitle || !questionType || questionText === '') {

            toast.error('Введены не все данные');
            return true;
        }

        if (questionType === 'TEXT') {
            return false;
        }

        if (questionAnswers.length === 0 ||
            questionAnswers[questionAnswers.length - 1].hasOwnProperty('answerTitle') &&
            questionAnswers[questionAnswers.length - 1].answerTitle === '') {

            toast.error('Введите ответ');
            return true;
        }

        return false;
    }

    saveAllDataQuestion = () => {
        const {questionId, questionTitle, questionType, questionManualCheck, questionText, isPageCreateQuestion} = this.state;
        const {saveQuestion, createQuestion, category, getMenuData, selection} = this.props;
        let {questionAnswers} = this.state;

        let error = this.validate();
        if (error) {
            return;
        }

        console.log('questionAnswers');
        console.log({questionAnswers});


        console.log('saveQuestion');
        console.log(questionText);

        questionAnswers = questionAnswers.map(elem => {
            if (typeof elem.answerId === 'string' || elem.answerId instanceof String) {
                delete elem.answerId;
            }

            return elem;
        });


        console.log('isPageCreateQuestion');
        console.log(isPageCreateQuestion);

        if (isPageCreateQuestion) {
            createQuestion(category.categoryId, {
                questionTitle,
                questionType,
                questionManualCheck,
                questionAnswers,
                questionText
            });

            setTimeout(() => {
                if (selection && selection.hasOwnProperty('selectionId') && selection.selectionId) {
                    getMenuData(selection.selectionId);
                }
            }, 100); // подумать как убрать - по завершению setTestExisting

            this.setState({isPageCreateQuestion: false});

            return;
        }

        saveQuestion(questionId, {questionTitle, questionType, questionManualCheck, questionAnswers, questionText});

        setTimeout(() => {
            if (selection && selection.hasOwnProperty('selectionId') && selection.selectionId) {
                getMenuData(selection.selectionId);
            }
        }, 100); // подумать как убрать - по завершению setTestExisting
    };

    handleDeleteAnswers(answerId) {
        const {questionAnswers} = this.state;
        const {deleteAnswer} = this.props;

        if (typeof answerId === 'string' || answerId instanceof String) {
            const newAnswers = questionAnswers.reduce((res, elem) => {
                if (elem.answerId === answerId) {
                    return res;
                }
                res.push(elem);
                return res;
            }, []);

            this.setState({questionAnswers: newAnswers});
            return;
        }

        console.log('handleDeleteAnswers');
        console.log(answerId);

        deleteAnswer(answerId, questionAnswers);
    }

    handleMarkdownAnswerChange(answerId, value) {
        const {questionAnswers} = this.state;
        const index = questionAnswers.findIndex(elem => elem.answerId === answerId);

        console.log('answerId, value, questionAnswers');
        console.log(answerId, value, questionAnswers);


        const newAnswers = [...questionAnswers];
        newAnswers[index].answerTitle = value;

        this.setState({questionAnswers: newAnswers});
    }


    handleClickAddAnswer = () => {
        console.log('click add');
        const {questionAnswers} = this.state;

        console.log('questionAnswers');
        console.log(questionAnswers);
        console.log(questionAnswers.length);
        console.log(questionAnswers[questionAnswers.length - 1]);

        if (!!questionAnswers.length &&
            questionAnswers[questionAnswers.length - 1].hasOwnProperty('answerTitle') &&
            questionAnswers[questionAnswers.length - 1].answerTitle === '') {
            return; // есть пустой ответ
        }

        this.setState((state) => {
            return {
                ...state,
                questionAnswers: [...state.questionAnswers, {
                    answerId: this.generateId(),
                    answerScore: 0,
                    answerTitle: '',
                    answerIsCorrect: false,
                }]
            };
        });
    };

    generateId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    handleMarkdownChange = (value) => {
        this.setState({questionText: value});
    };

    handleChangeCheckbox = () => {
        this.setState({questionManualCheck: !this.state.questionManualCheck});
    };

    handleTitleQuestionChange = e => {
        this.setState({questionTitle: e.currentTarget.value});
    };

    handleChangeSelectType = (e) => {
        const {questionAnswers} = this.state;

        let newQuestionAnswers = questionAnswers.map((elem) => {
            elem.answerIsCorrect = false;
            return elem;
        });

        console.log('handleChangeSelectType');
        console.log(newQuestionAnswers);

        if (newQuestionAnswers.length === 1 &&
            newQuestionAnswers[0].answerTitle === ''
        ) {
            newQuestionAnswers = [{
                answerId: this.generateId(),
                answerScore: 0,
                answerTitle: '',
                answerIsCorrect: false,
            }];
        }

        if (newQuestionAnswers.length === 0) {
            newQuestionAnswers = [{
                answerId: this.generateId(),
                answerScore: 0,
                answerTitle: '',
                answerIsCorrect: false,
            }];
        }

        if (e.target.name === 'TEXT') {
            newQuestionAnswers = [];
        }

        this.setState({questionAnswers: newQuestionAnswers});
        this.setState({[e.target.name]: e.target.value});

    };
}

function mapStateToProps(state) {
    return {
        redirectToCategory: state.question.redirectToCategory,
        question: state.question.question,
        questionAnswers: state.question.questionAnswers,
        category: state.category.category,
        selection: state.selection.selection,
        fromTestHomePage: state.routeNavigation.fromTestHomePage,
        test: state.test.test,
    };
}

const mapDispatchToProps = (dispatch) => ({
    getQuestionInfo: (testId) => dispatch(getQuestionInfo(testId)),
    saveQuestion: (questionId, question) => dispatch(saveQuestion(questionId, question)),
    createQuestion: (categoryId, question) => dispatch(createQuestion(categoryId, question)),
    getAnswers: (questionId) => dispatch(getAnswers(questionId)),
    saveAnswers: (questionId, questionAnswers) => dispatch(saveAnswers(questionId, questionAnswers)),
    getMenuData: (selectionId) => dispatch(getMenuData(selectionId)),
    deleteQuestion: (questionId) => dispatch(deleteQuestion(questionId)),
    deleteAnswer: (answerId, questionAnswers) => dispatch(deleteAnswer(answerId, questionAnswers))
});

export default withToast(connect(mapStateToProps, mapDispatchToProps)(QuestionPage));
