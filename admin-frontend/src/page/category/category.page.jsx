import React from 'react';
import {connect} from 'react-redux';
import '../../components/statistic/statistic.less';
import {
    createNewCategory,
    deleteCategory,
    getCategoryInfo,
    getQuestionForCategory,
    saveCategory
} from './category.action';
import './category.page.less';
import {withToast} from 'material-ui-toast-redux';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import {Link, Redirect} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {QUESTION, TEST} from '../../constant/routes-map.constant';
import MenuTree from '../../components/menu/menu.jsx';
import {getMenuData} from '../../components/menu/menu.action';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import IconButton from '@material-ui/core/IconButton';
import {toast} from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import {getQuestionStatistic} from '../../components/statistic/statistic.action';
import DialogContent from '@material-ui/core/DialogContent';
import DeleteDialog from '../../components/delete-dialog/delete-dialog.jsx';

class CategoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            categoryId: 0,
            categoryTitle: '',
            categoryScore: 0,
            isPageCreateCategory: false,
            redirectToNewQuestion: false,
            redirectToTest: false,
            fromTestHomePage: false,
            openCloseDeleteDialog: false,
            questionStatistic: null,
            categoryQuestionsLimit: 0,
            openDialogStatistic: false,
            isAllQuestion: false,
        };
    }

    componentDidMount() {
        const {getCategoryInfo, getQuestionForCategory} = this.props;
        const {categoryId} = this.props.match.params;

        if (!categoryId) {
            this.setState((state) => {
                return {
                    ...state,
                    isPageCreateCategory: true
                };
            });
            return;
        }

        getCategoryInfo(categoryId);
        getQuestionForCategory(categoryId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.hasOwnProperty('categoryId') &&
            this.props.match.params.categoryId !== prevProps.match.params.categoryId
        ) {
            const {getCategoryInfo, getQuestionForCategory} = this.props;
            const {categoryId} = this.props.match.params;

            this.setState({isPageCreateCategory: false});

            getCategoryInfo(categoryId);
            getQuestionForCategory(categoryId);
        }

        if (this.props.questions !== prevProps.questions ||
            this.props.category !== prevProps.category ||
            this.props.redirectToTest !== prevProps.redirectToTest ||
            this.props.fromTestHomePage !== prevProps.fromTestHomePage ||
            this.props.questionStatistic !== prevProps.questionStatistic ||
            this.props.isAllQuestion !== prevProps.isAllQuestion
        ) {

            const {questions, category, redirectToTest, fromTestHomePage, questionStatistic, isAllQuestion} = this.props;
            const {categoryId, categoryTitle, categoryScore, categoryQuestionsLimit} = category;

            if (categoryId) {
                this.setState({isPageCreateCategory: false});
            }

            this.setState((state) => {
                return {
                    ...state,
                    questions,
                    categoryId,
                    categoryTitle,
                    redirectToTest,
                    categoryScore,
                    fromTestHomePage,
                    questionStatistic,
                    categoryQuestionsLimit,
                    isAllQuestion
                };
            });
        }
    }

    render() {
        const {
            questions,
            categoryTitle,
            redirectToNewQuestion,
            redirectToTest,
            categoryScore,
            isPageCreateCategory,
            questionStatistic,
            categoryQuestionsLimit,
            isAllQuestion
        } = this.state;

        console.log('questionStatistic');
        console.log(questionStatistic);

        if (redirectToTest) {
            return <Redirect to={`${TEST}/${this.props.test.testId}`}/>;
        }

        if (redirectToNewQuestion) {
            return <Redirect to={QUESTION}/>;
        }

        return (<div className='category'>
            <Fab color='primary'
                 aria-label='Add'
                 onClick={this.onClickAddQuestion}
                 disabled={isPageCreateCategory}
                 className={'category__icon'}>
                <AddIcon/>
            </Fab>
            {
                <nav className='category__menu'>
                    <MenuTree
                        selectionId={this.props.selection && this.props.selection.hasOwnProperty('selectionId') && this.props.selection.selectionId}
                        testId={this.props.test && this.props.test.hasOwnProperty('testId') && this.props.test.testId}
                    />
                </nav>
            }

            <div className='category__container'>
                <section className='category__block _base-info'>
                    <div className='category__block-row'>
                        <TextField
                            value={categoryTitle}
                            onChange={this.handleTitleCategoryChange}
                            id='category-name-field'
                            label='Название категории'
                            fullWidth
                            className={'category__name-field'}
                            margin='normal'
                        />
                        <IconButton aria-label='DeleteTest'
                                    onClick={this.handleOpenDeleteDialog}
                                    className={'test__test-row-icon-wrapper'}>
                            <DeleteForeverOutlinedIcon
                                className={'test__test-row-icon'}/>
                        </IconButton>
                    </div>

                    <TextField
                        id='category-score-field'
                        className={'category__score-field'}
                        label='Балл за вопросы'
                        value={categoryScore}
                        onChange={this.handleScoreCategoryChange}
                        type='number'
                        margin='normal'
                        inputProps={{min: '0', step: '1'}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    {
                        !isAllQuestion && <TextField
                            value={categoryQuestionsLimit}
                            onChange={this.handleCategoryQuestionsLimit}
                            id='category-name-field'
                            label='Максимальное количество вопросов из категории'
                            fullWidth
                            className={'category__score-field'}
                            margin='normal'
                        />
                    }

                    <Button variant='contained'
                            size='medium'
                            color='primary'
                            onClick={this.saveCategory}>
                        Сохранить категорию
                    </Button>
                </section>

                <section className='category__table-wrapper'>
                    <Table className={'category__table'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Вопрос</TableCell>
                                <TableCell>Посмотреть статистику</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                !!questions && questions.map(question => (
                                    <TableRow key={question.questionId}>
                                        <TableCell>
                                            <Link to={`../question/${question.questionId}`}>
                                                {question.questionTitle}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={this.handleOpenStatistic.bind(this, question.questionId)}
                                                    color='primary'>
                                                Статистика
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </section>
            </div>

            <DeleteDialog
                open={this.state.openCloseDeleteDialog}
                onClose={this.handleCloseDeleteDialog}
                onConfirm={this.handleDeleteCategory}
                />

            <Dialog
                open={this.state.openDialogStatistic}
                onClose={this.handleCloseStatisticDialog}>
                <DialogTitle>{'Статистика'}</DialogTitle>
                {
                    !!questionStatistic && <DialogContent>
                        <div className='statistic'>
                            <div className='statistic__col'>
                                <div className='statistic__row'>
                                    <div className='statistic__key'>Вопрос:</div>
                                    <div className='statistic__value'>{questionStatistic.question.questionTitle}</div>
                                </div>
                                <div className='statistic__row'>
                                    <div className='statistic__key'>Количество ответов:</div>
                                    <div className='statistic__value'>{questionStatistic.mainInfo.answersCount}</div>
                                </div>
                                <div className='statistic__row'>
                                    <div className='statistic__key'>Количество правильных ответов:</div>
                                    <div
                                        className='statistic__value'>{questionStatistic.mainInfo.correctAnswersCount}</div>
                                </div>
                                <div className='statistic__row'>
                                    <div className='statistic__key'>Процент правильных ответов:</div>
                                    <div
                                        className='statistic__value'>{questionStatistic.mainInfo.correctAnswersPercentage}</div>
                                </div>
                                <div className='statistic__row'>
                                    <div className='statistic__key'>Количество неправильных ответов:</div>
                                    <div
                                        className='statistic__value'>{questionStatistic.mainInfo.incorrectAnswersCount}</div>
                                </div>
                                <div className='statistic__row'>
                                    <div className='statistic__key'>Процент неправильных ответов:</div>
                                    <div
                                        className='statistic__value'>{questionStatistic.mainInfo.incorrectAnswersPercentage}</div>
                                </div>
                            </div>
                            <Table className={'statistic__table'}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Ответ</TableCell>
                                        <TableCell>Это правильный ответ</TableCell>
                                        <TableCell>Количество ответов</TableCell>
                                        <TableCell>Процент ответа от ответов</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        questionStatistic.userAnswers.map((answer, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{answer.answer.answerTitle}</TableCell>
                                                <TableCell>{answer.answer.answerIsCorrect ? 'Да' : 'Нет'}</TableCell>
                                                <TableCell>{answer.answersCount}</TableCell>
                                                <TableCell>{answer.answersPercent}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </DialogContent>
                }
                <DialogActions>
                    <Button onClick={this.handleCloseStatisticDialog} color='primary' autoFocus>
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </div>);
    }

    handleCategoryQuestionsLimit = (e) => {
        this.setState({categoryQuestionsLimit: e.target.value});
    };

    handleOpenStatistic = (questionId) => {
        this.props.getQuestionStatistic(questionId);

        setTimeout(() => {
            const {questionStatistic} = this.state;

            if (!questionStatistic) {
                return;
            }

            this.setState({openDialogStatistic: true});
        }, 500);
    };

    handleCloseStatisticDialog = () => {
        this.setState({openDialogStatistic: false});
    };


    handleCloseDeleteDialog = () => {
        this.setState({openCloseDeleteDialog: false});
    };

    handleOpenDeleteDialog = () => {
        this.setState({openCloseDeleteDialog: true});
    };

    handleScoreCategoryChange = (e) => {
        this.setState({categoryScore: e.target.value});
    };

    handleDeleteCategory = () => {
        const {deleteCategory, selection, getMenuData} = this.props;
        const {categoryId} = this.state;

        deleteCategory(categoryId);
        setTimeout(() => {
            if (selection && selection.hasOwnProperty('selectionId') && selection.selectionId) {
                getMenuData(selection.selectionId);
            }
        }, 100); // подумать как убрать - по завершению setTestExisting

        this.handleCloseDeleteDialog();
    };

    onClickAddQuestion = () => {
        this.setState({redirectToNewQuestion: true});
    };

    handleTitleCategoryChange = (e) => {
        this.setState({categoryTitle: e.target.value});
    };

    handleClickBreadcrumbs = () => {
        console.log('click on breadcrumbs');
    };

    validate() {
        const {categoryTitle, categoryScore} = this.state;

        if (!categoryTitle || !categoryScore) {
            toast.error('Введены не все данные');
            return true;
        }

        if (+categoryScore < 0) {
            toast.error('Балл за вопросы не может быть меньше нуля');
            return true;
        }

        return false;
    }

    saveCategory = () => {
        const {categoryTitle, categoryId, isPageCreateCategory, categoryScore, categoryQuestionsLimit} = this.state;
        const {saveCategory, createNewCategory, selection, getMenuData} = this.props;
        const {testId} = this.props.test;

        const error = this.validate();
        if (error) {
            return;
        }

        if (isPageCreateCategory) {
            createNewCategory(testId, {categoryTitle, categoryScore, categoryQuestionsLimit});

            setTimeout(() => {
                if (selection && selection.hasOwnProperty('selectionId') && selection.selectionId) {
                    getMenuData(selection.selectionId);
                }
            }, 100); // подумать как убрать

            return;
        }

        saveCategory(categoryId, {categoryTitle, categoryScore, categoryQuestionsLimit});

        setTimeout(() => {
            if (selection && selection.hasOwnProperty('selectionId') && selection.selectionId) {
                getMenuData(selection.selectionId);
            }
        }, 100); // подумать как убрать
    };
}

function mapStateToProps(state) {
    return {
        isAllQuestion: state.typeQuestionService.isAllQuestion,
        questionStatistic: state.statistic.questionStatistic,
        questions: state.category.questions,
        category: state.category.category,
        redirectToTest: state.category.redirectToTest,
        test: state.test.test,
        selection: state.selection.selection, // делать запрос за selection, если его нет??
        fromTestHomePage: state.routeNavigation.fromTestHomePage
    };
}

const mapDispatchToProps = (dispatch) => ({
    getCategoryInfo: (categoryId) => dispatch(getCategoryInfo(categoryId)),
    getQuestionForCategory: (categoryId) => dispatch(getQuestionForCategory(categoryId)),
    saveCategory: (categoryId, category) => dispatch(saveCategory(categoryId, category)),
    createNewCategory: (testId, category) => dispatch(createNewCategory(testId, category)),
    getMenuData: (selectionId) => dispatch(getMenuData(selectionId)),
    deleteCategory: (categoryId) => dispatch(deleteCategory(categoryId)),
    getQuestionStatistic: (questionId) => dispatch(getQuestionStatistic(questionId))
});

export default withToast(connect(mapStateToProps, mapDispatchToProps)(CategoryPage));
