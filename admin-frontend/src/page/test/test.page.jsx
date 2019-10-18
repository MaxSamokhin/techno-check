import React from 'react';
import {connect} from 'react-redux';
import {changeTest, createNewTest, createOneTest, deleteTest, getCategoriesForTest, getTestInfo} from './test.action';
import './test.page.less';
import {withToast} from 'material-ui-toast-redux';
import TextField from '@material-ui/core/TextField';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import {Link, Redirect} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import {CATEGORY} from '../../constant/routes-map.constant';
import MenuTree from '../../components/menu/menu.jsx';
import {getMenuData} from '../../components/menu/menu.action';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import xssFilter from 'showdown-xss-filter';
import {toast} from 'react-toastify';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {setAllQuestion, setNotAllQuestion} from '../../components/type-question-service/type-question-service.action';
import DeleteDialog from '../../components/delete-dialog/delete-dialog.jsx';


class TestPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            testId: -1,
            testTitle: '',
            timeLimit: '',
            allowSkipQuestion: false,
            categoriesList: null,
            redirectToInquirer: false,
            isPageCreateTest: false,
            redirectToCreateCategory: false,
            fromTestHomePage: false,
            testDescription: '',
            openCloseDeleteDialog: false,
            testAllQuestions: false,
            testRandomQuestions: false,
            tab: 'write'
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
        const {getTestInfo, getCategoriesForTest} = this.props;
        const {testId} = this.props.match.params;

        if (!testId) {
            this.setState((state) => {
                return {
                    ...state,
                    isPageCreateTest: true
                };
            });
            return;
        }

        getTestInfo(testId);
        getCategoriesForTest(testId);
    }

    componentDidUpdate(prevProps) {
        console.log('componentDidUpdate12');
        console.log(this.props.match.params.testId);

        if (this.props.match.params.hasOwnProperty('testId') &&
            this.props.match.params.testId !== prevProps.match.params.testId
        ) {
            const {testId} = this.props.match.params;
            const {getTestInfo, getCategoriesForTest} = this.props;

            this.setState({isPageCreateTest: false});

            getTestInfo(testId);
            getCategoriesForTest(testId);
        }

        if (this.props.test !== prevProps.test ||
            this.props.categoriesList !== prevProps.categoriesList ||
            this.props.fromTestHomePage !== prevProps.fromTestHomePage) {

            const {test, categoriesList, fromTestHomePage} = this.props;
            const {testId, timeLimit, testTitle, allowSkipQuestion, testDescription, testAllQuestions, testRandomQuestions} = test || {
                allowSkipQuestion: false,
                testAllQuestions: false,
                testRandomQuestions: false,
                testId: -1,
                timeLimit: '',
                testTitle: '',
                testType: '',
                testDescription: ''
            };

            if (testAllQuestions) {
                this.props.setAllQuestion();
            } else {
                this.props.setNotAllQuestion();
            }

            let isPageCreateTest = true;

            if (testId) {
                isPageCreateTest = false;
            }

            this.setState((state) => {
                return {
                    ...state,
                    testId,
                    testTitle,
                    timeLimit,
                    categoriesList,
                    isPageCreateTest,
                    testAllQuestions,
                    testRandomQuestions,
                    allowSkipQuestion,
                    fromTestHomePage,
                    testDescription
                };
            });
        }
    }

    render() {
        const {
            testTitle,
            testId,
            timeLimit,
            categoriesList,
            redirectToInquirer,
            redirectToCreateCategory,
            isPageCreateTest,
            testDescription
        } = this.state;

        console.log('testDescription testDescription testDescriptiontestDescription testDescription testDescription');
        console.log(testDescription);

        // если будут проблемы с появлением меню при прямом заходе на страницу, то это нужно будет поправить здесь
        const {selection} = this.props;

        if (redirectToCreateCategory) {
            return <Redirect to={CATEGORY}/>;
        }

        if (redirectToInquirer) {
            return <Redirect to={`/admin/selection/${selection.selectionId}`}/>;
        }

        return (<div className='test'>
            <Fab color='primary'
                 aria-label='Add'
                 className={'test__icon'}
                 disabled={isPageCreateTest}
                 onClick={this.handleClickAdd}>
                <AddIcon/>
            </Fab>
            {
                <nav className='test__menu'>
                    <MenuTree
                        selectionId={selection && selection.hasOwnProperty('selectionId') && selection.selectionId}
                        testId={testId}
                    />
                </nav>
            }

            <div className='test__container'>
                <div className='test__test _base-info'>
                    <div className='test__test-row'>
                        <TextField
                            value={testTitle}
                            onChange={this.handleTitleTestChange}
                            id='test-name'
                            label='Название теста'
                            fullWidth
                            className={'test__test-label'}
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
                        id='test-time'
                        label='Длительность теста'
                        type='time'
                        value={timeLimit}
                        fullWidth
                        margin='normal'
                        className={'test__test-field'}
                        onChange={this.handleTimeTestChange}
                        inputProps={{
                            shrink: true,
                            step: 300,
                        }}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.allowSkipQuestion}
                                onChange={this.handleAllowSkipQuestion}
                                color='primary'
                            />
                        }
                        label='Разрешить пропускать вопросы?'
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.testAllQuestions}
                                onChange={this.handleTestAllQuestion}
                                color='primary'
                            />
                        }
                        label='Выдавать все вопросы'
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.testRandomQuestions}
                                onChange={this.handleTestRandomQuestion}
                                color='primary'
                            />
                        }
                        label='Выдавать вопросы в случайном порядке'
                    />

                    <span className='question__label'>Описание теста</span>
                    <ReactMde
                        className={'question__markdown'}
                        value={testDescription}
                        onChange={this.handleMarkdownChange}
                        generateMarkdownPreview={markdown =>
                            Promise.resolve(this.converter.makeHtml(markdown))
                        }
                        l18n={{write: 'Редактор', preview: 'Превью'}}
                        minEditorHeight={100}
                        maxEditorHeight={160}
                        onTabChange={this.handleTabChange}
                        selectedTab={this.state.tab}
                    />

                    <Button variant='contained'
                            size='medium'
                            color='primary'
                            onClick={this.saveTest}>
                        Сохранить тест
                    </Button>
                </div>

                <section className='test__table-wrapper'>
                    <Table className={'test__table'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Категория</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                !!categoriesList && categoriesList.map(category => (
                                    <TableRow key={category.categoryId}>
                                        <TableCell>
                                            <Link to={`../category/${category.categoryId}`}>
                                                {category.categoryTitle}
                                            </Link>
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
                onConfirm={this.handleDeleteTest}
            />
        </div>);
    }

    handleTestAllQuestion = () => {
        const {testAllQuestions} = this.state;

        if (testAllQuestions) {
            this.props.setAllQuestion();
        } else {
            this.props.setNotAllQuestion();
        }

        this.setState({testAllQuestions: !testAllQuestions});
    };

    handleTestRandomQuestion = () => {
        this.setState({testRandomQuestions: !this.state.testRandomQuestions});
    };

    handleAllowSkipQuestion = () => {
        this.setState({allowSkipQuestion: !this.state.allowSkipQuestion});
    };

    handleChangeSelectType = (e) => {
        if (e.target.value === 'ALL_QUESTIONS') {
            this.props.setAllQuestion();
        } else {
            this.props.setNotAllQuestion();
        }

        this.setState({[e.target.name]: e.target.value});
    };

    handleCloseDeleteDialog = () => {
        this.setState({openCloseDeleteDialog: false});
    };

    handleOpenDeleteDialog = () => {
        this.setState({openCloseDeleteDialog: true});
    };

    handleTabChange = (tab) => {
        this.setState({tab});
    };

    handleMarkdownChange = (value) => {
        this.setState({testDescription: value});
    };

    validate() {
        const {testTitle, timeLimit, testDescription} = this.state;

        if (!testTitle || !timeLimit || testDescription === '') {
            toast.error('Введены не все данные');
            return true;
        }

        return false;
    }

    saveTest = () => {
        const {testId, testTitle, timeLimit, isPageCreateTest, testDescription, allowSkipQuestion, testRandomQuestions, testAllQuestions} = this.state;
        const {changeTest, createNewTest, getMenuData, fromTestHomePage, createOneTest} = this.props;
        const {selectionId} = this.props.selection || -1;

        const error = this.validate();
        if (error) {
            return;
        }

        console.log(testDescription);
        console.log({testTitle, timeLimit});

        if (isPageCreateTest) {
            console.log('new test');
            console.log(selectionId, {testTitle, testDescription, timeLimit, allowSkipQuestion, testRandomQuestions, testAllQuestions});


            console.log('saveTest fromTestHomePage');
            console.log(fromTestHomePage);
            if (fromTestHomePage) {
                createOneTest({testTitle, testDescription, timeLimit, testRandomQuestions, testAllQuestions, allowSkipQuestion});

                return;
            }

            createNewTest(selectionId, {testTitle, testDescription, timeLimit, testRandomQuestions, testAllQuestions, allowSkipQuestion});

            setTimeout(() => {
                if (selectionId) {
                    getMenuData(selectionId);
                }
            }, 100);

            return;
        }

        changeTest(testId, {testTitle, testDescription, timeLimit, testRandomQuestions, testAllQuestions, allowSkipQuestion});

        setTimeout(() => {
            if (selectionId) {
                getMenuData(selectionId);
            }
        }, 100); // подумать как убрать
    };

    handleClickAdd = () => {
        this.setState({redirectToCreateCategory: true});
    };

    handleTitleTestChange = (e) => {
        this.setState({testTitle: e.currentTarget.value});
    };

    handleTimeTestChange = (e) => {
        this.setState({timeLimit: e.currentTarget.value});
    };

    handleDeleteTest = () => {
        //TODO
        const {deleteTest} = this.props;
        const {testId} = this.state;

        deleteTest(testId);
        this.setState({redirectToInquirer: true});
        this.handleCloseDeleteDialog();
    }
}

function mapStateToProps(state) {
    return {
        test: state.test.test,
        categoriesList: state.test.categoriesList,
        selection: state.selection.selection,
        fromTestHomePage: state.routeNavigation.fromTestHomePage,
    };
}

const mapDispatchToProps = (dispatch) => ({
    setAllQuestion: () => dispatch(setAllQuestion()),
    setNotAllQuestion: () => dispatch(setNotAllQuestion()),
    createOneTest: (test) => dispatch(createOneTest(test)),
    deleteTest: (testId) => dispatch(deleteTest(testId)),
    getTestInfo: (testId) => dispatch(getTestInfo(testId)),
    getCategoriesForTest: (testId) => dispatch(getCategoriesForTest(testId)),
    changeTest: (testId, test) => dispatch(changeTest(testId, test)),
    createNewTest: (selectionId, test) => dispatch(createNewTest(selectionId, test)),
    getMenuData: (selectionId) => dispatch(getMenuData(selectionId))
});

export default withToast(connect(mapStateToProps, mapDispatchToProps)(TestPage));
