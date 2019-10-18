import React from 'react';
import {connect} from 'react-redux';
import {
    createNewSelection,
    deleteSelection,
    getAllTest,
    getSelectionInfo,
    getTestsForSelection,
    saveSelection,
    setTestExisting
} from './selection.action';
import './selection.page.less';
import {Link, Redirect} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
// import {DatePicker, MuiPickersUtilsProvider, TimePicker} from 'material-ui-pickers';
import {InlineDateTimePicker, MuiPickersUtilsProvider} from 'material-ui-pickers';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import {withToast} from 'material-ui-toast-redux';
import {SELECTION_HOME, TEST, USERS} from '../../constant/routes-map.constant';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogActions from '@material-ui/core/DialogActions';
import '../../../node_modules/react-ui-tree/dist/react-ui-tree.css';
import MenuTree from '../../components/menu/menu.jsx';
import Menu from '@material-ui/core/Menu';
import {getMenuData} from '../../components/menu/menu.action';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import xssFilter from 'showdown-xss-filter';
import {toast} from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import DeleteDialog from '../../components/delete-dialog/delete-dialog.jsx';

class SelectionPage extends React.Component {
    constructor(props) {
        super(props);

        let dateStart = new Date();
        let dateStop = new Date();

        dateStart.setHours(dateStart.getHours() + 1);
        dateStop.setHours(dateStop.getHours() + 5);

        this.state = {
            redirectToUserPage: false,
            isPageCreateSelection: false,
            redirectToHomeSelection: false,
            selectionId: null,
            selectionTitle: '',
            selectedDateStart: dateStart,
            selectedDateEnd: dateStop,
            selectionStatus: '',
            testForSelection: [],
            redirectToAddTest: false,
            anchorEl: null,
            openDialog: false,
            allTest: [],
            selectionDescription: '',
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
        const {getSelectionInfo, getTestsForSelection} = this.props;
        const {selectionId} = this.props.match.params;

        if (!selectionId) {
            this.setState((state) => {
                return {
                    ...state,
                    isPageCreateSelection: true
                };
            });
            return;
        }

        console.log('selectionId componentDidMount');
        console.log(selectionId);

        getTestsForSelection(selectionId);
        getSelectionInfo(selectionId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.selection !== prevProps.selection) {
            const selection = this.props.selection;

            if (selection.hasOwnProperty('selectionId')) {
                this.props.getMenuData(selection.selectionId);
            }
        }

        if (this.props.selection !== prevProps.selection ||
            this.props.testForSelection !== prevProps.testForSelection ||
            this.props.redirectToHomeSelection !== prevProps.redirectToHomeSelection ||
            this.props.allTest !== prevProps.allTest
        ) {

            const {
                selectionId,
                selectionTitle,
                selectionStartDate,
                selectionEndDate,
                selectionDescription,
                selectionStatus
            } = this.props.selection || {
                selectionId: null,
                selectionDescription: '',
                selectionTitle: '',
                selectionStartDate: new Date(),
                selectionEndDate: new Date(),
                selectionStatus: ''
            };
            const allTest = this.props.allTest || [];
            const testForSelection = this.props.testForSelection || [];
            const redirectToHomeSelection = this.props.redirectToHomeSelection || false;

            if (!selectionId || !selectionTitle) {
                this.setState((state) => {
                    return {
                        ...state,
                        isPageCreateSelection: true
                    };
                });
            } else {
                this.setState({isPageCreateSelection: false});
            }

            this.setState((state) => {
                return {
                    ...state,
                    isPageCreateSelection: false,
                    testForSelection: testForSelection,
                    redirectToHomeSelection: redirectToHomeSelection,
                    selectionId: selectionId,
                    selectionTitle: selectionTitle,
                    selectedDateStart: selectionStartDate,
                    selectedDateEnd: selectionEndDate,
                    allTest,
                    selectionDescription,
                    selectionStatus
                };
            });
        }

        if (this.props.errorMsgSelection !== prevProps.errorMsgSelection) {
            const {openToast, errorMsgSelection} = this.props;

            if (errorMsgSelection) {
                openToast({
                    messages: [errorMsgSelection],
                    type: 'error',
                    autoHideDuration: 4000,
                });
            }
        }
    }

    render() {
        const {
            testForSelection,
            redirectToHomeSelection,
            selectionTitle,
            selectedDateStart,
            selectedDateEnd,
            redirectToUserPage,
            selectionId,
            redirectToAddTest,
            anchorEl,
            openDialog,
            allTest,
            isPageCreateSelection,
            selectionDescription,
            openCloseDeleteDialog,
            selectionStatus
        } = this.state;

        const classDeleteButton = `selection__selection-block-icon-add ${isPageCreateSelection ? '_disabled' : ''}`;

        console.log('redirectToHomeSelection render');
        console.log(redirectToHomeSelection);

        if (redirectToAddTest) {
            return <Redirect to={TEST}/>;
        }

        if (redirectToHomeSelection) {
            return <Redirect to={SELECTION_HOME}/>;
        }

        if (redirectToUserPage) {
            return <Redirect to={`${USERS}${selectionId}`}/>;
        }

        const dateMask = [/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/];
        const disabled = selectionStatus === 'ACTIVE' || selectionStatus === 'ENDED';
        return (
            <div className='selection'>

                <div className='selection__icon'>
                    <Fab color='primary'
                         disabled={isPageCreateSelection || selectionStatus === 'ACTIVE' || selectionStatus === 'ENDED'}
                         aria-label='Add'
                         aria-owns={anchorEl ? 'simple-menu' : undefined}
                         aria-haspopup='true'
                         className={'selection__icon-item'}
                         onClick={this.handleClickAdd}>
                        <AddIcon/>
                    </Fab>

                    <Menu
                        id='simple-menu'
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleCloseAddMenu}>

                        <MenuItem onClick={this.handleAddNewTest}>Создать новый тест</MenuItem>
                        <MenuItem onClick={this.handleSelectExistingTest}>Выбрать существующий тест</MenuItem>
                    </Menu>
                </div>

                <section className='selection__content'>
                    {
                        !isPageCreateSelection &&
                        <div className='selection__content-menu'>
                            <MenuTree selectionId={selectionId}/>
                        </div>
                    }

                    <div className='selection__content-item'>
                        <section className='selection__selection _base-info'>
                            <div className='selection__selection-block'>
                                <TextField
                                    value={selectionTitle}
                                    onChange={this.handleTitleSelectionChange}
                                    disabled={disabled}
                                    id='standard-full-width'
                                    label='Название набора'
                                    placeholder='Название набора'
                                    fullWidth
                                    className={'selection__selection-label'}
                                    margin='normal'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <IconButton aria-label='DeleteSelection'
                                            onClick={this.handleOpenDeleteDialog}>
                                    <DeleteForeverOutlinedIcon
                                        className={'selection__selection-block-icon'}/>
                                </IconButton>

                                <IconButton aria-label='ShowUser'
                                            onClick={this.showUserThisSelection}
                                            disabled={isPageCreateSelection}>
                                    <svg xmlns='http://www.w3.org/2000/svg'
                                         className={classDeleteButton}
                                         width='24'
                                         height='24'
                                         viewBox='0 0 24 24'>
                                        <path
                                            d='M8 10H5V7H3v3H0v2h3v3h2v-3h3v-2zm10 1c1.66 0 2.99-1.34 2.99-3S19.66 5 18 5c-.32 0-.63.05-.91.14.57.81.9 1.79.9 2.86s-.34 2.04-.9 2.86c.28.09.59.14.91.14zm-5 0c1.66 0 2.99-1.34 2.99-3S14.66 5 13 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm6.62 2.16c.83.73 1.38 1.66 1.38 2.84v2h3v-2c0-1.54-2.37-2.49-4.38-2.84zM13 13c-2 0-6 1-6 3v2h12v-2c0-2-4-3-6-3z'/>
                                    </svg>
                                </IconButton>
                            </div>

                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                                <div className='selection__date-pickers'>
                                    <InlineDateTimePicker
                                        keyboard
                                        ampm={false}
                                        label='Дата начала'
                                        value={selectedDateStart}
                                        disablePast={!disabled}
                                        disabled={disabled}
                                        minDateMessage={'Дата должна быть в будущем'}
                                        invalidDateMessage={'Неправильный формат даты'}
                                        onChange={this.handleDateStartChange}
                                        onError={console.log}
                                        format={'yyyy/MM/dd HH:mm'}
                                        mask={dateMask}
                                    />
                                    <InlineDateTimePicker
                                        keyboard
                                        ampm={false}
                                        label='Дата окончания'
                                        value={selectedDateEnd}
                                        disabled={disabled}
                                        minDate={selectedDateStart}
                                        minDateMessage={'Дата должна быть в будущем'}
                                        invalidDateMessage={'Неправильный формат даты'}
                                        onChange={this.handleDateEndChange}
                                        onError={console.log}
                                        format={'yyyy/MM/dd HH:mm'}
                                        mask={dateMask}
                                    />
                                </div>
                            </MuiPickersUtilsProvider>

                            <div className='selection__description'>
                                <span>Описание набора</span>
                                {(disabled)
                                    ? <ReactMarkdown source={selectionDescription}/>
                                    :
                                    <ReactMde
                                        className={'selection__markdown'}
                                        value={selectionDescription}
                                        onTabChange={this.handleTabChange}
                                        onChange={this.handleMarkdownChange}
                                        generateMarkdownPreview={markdown =>
                                            Promise.resolve(this.converter.makeHtml(markdown))
                                        }
                                        l18n={{write: 'Редактор', preview: 'Превью'}}
                                        minEditorHeight={50}
                                        maxEditorHeight={1000}
                                        selectedTab={this.state.tab}
                                    />
                                }
                            </div>

                            <Button variant='contained'
                                    size='medium'
                                    color='primary'
                                    onClick={this.saveSelection}>
                                <p>Сохранить набор</p>
                            </Button>
                        </section>

                        <section className='selection__tests'>
                            <Table className='selection__table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Тест</TableCell>
                                        <TableCell align='right'>Лимит времени</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        !!testForSelection && testForSelection.map(test => (
                                            <TableRow key={test.testId}>
                                                <TableCell>
                                                    <Link to={`../test/${test.testId}`}>
                                                        {test.testTitle}
                                                    </Link>
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {test.timeLimit}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </section>
                    </div>
                </section>

                <Dialog
                    className={'selection__dialog'}
                    onClose={this.handleCloseDialog}
                    aria-labelledby='customized-dialog-title'
                    open={openDialog}>
                    <header className='selection__dialog-header'>
                        <Typography variant='h6'>Выберете тест для добовления</Typography>
                        <IconButton aria-label='Close'
                                    onClick={this.handleCloseDialog}>
                            <CloseIcon/>
                        </IconButton>
                    </header>

                    <DialogContent className={'selection__dialog-content'}>
                        <section className='selection__dialog-table-wrapper'>
                            <Table className={'selection__dialog-table'}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Тест</TableCell>
                                        <TableCell align='right'>Лимит времени</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        !!allTest && allTest.map(test => (
                                            <TableRow key={test.testId}
                                                      className={'selection__dialog-table-row'}
                                                      onClick={this.handleClickDialogSelectTest.bind(this, test.testId)}>
                                                <TableCell>
                                                    {test.testTitle}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {test.timeLimit}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </section>
                    </DialogContent>
                </Dialog>

                <DeleteDialog
                    open={openCloseDeleteDialog}
                    onClose={this.handleCloseDeleteDialog}
                    onConfirm={this.handleDeleteSelection}
                />
            </div>
        );
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

    handleMarkdownChange = (value) => {
        this.setState({selectionDescription: value});
    };

    handleClickDialogSelectTest(testId) {
        console.log('click testId', testId);
        const {setTestExisting, getMenuData} = this.props;
        const {selectionId} = this.state;

        setTestExisting(selectionId, testId);
        setTimeout(() => {
            if (selectionId) {
                getMenuData(selectionId);
            }
        }, 100); // подумать как убрать - по завершению setTestExisting

        this.handleCloseDialog();
    }

    handleCloseDialog = () => {
        this.setState({openDialog: false});
    };

    handleAddNewTest = () => {
        this.setState({redirectToAddTest: true});
    };

    handleSelectExistingTest = () => {
        const {getAllTest} = this.props;
        getAllTest();

        this.handleCloseAddMenu();
        this.setState({openDialog: true});
    };

    handleCloseAddMenu = () => {
        this.setState({anchorEl: null});
    };

    handleTitleSelectionChange = e => {
        this.setState({selectionTitle: e.currentTarget.value});
    };

    handleDateStartChange = date => {
        this.setState((state) => {
            return {
                ...state,
                selectedDateStart: date
            };
        });
    };

    handleDateEndChange = date => {
        this.setState((state) => {
            return {
                ...state,
                selectedDateEnd: date
            };
        });
    };

    handleDeleteSelection = () => {
        console.log('deleteSelection');
        const {deleteSelection} = this.props;
        const {selectionId} = this.state;

        deleteSelection(selectionId);
        this.handleCloseDeleteDialog();
    };

    showUserThisSelection = () => {
        this.setState((state) => {
            return {
                ...state,
                redirectToUserPage: true
            };
        });
    };

    validate() {
        const {selectionTitle, selectedDateStart, selectedDateEnd, selectionDescription} = this.state;

        console.log('validate');
        console.log(selectionDescription);

        if (!selectionTitle || !selectedDateStart || !selectedDateEnd || selectionDescription === '') {
            toast.error('Введены не все данные');
            return true;
        }

        if (new Date(selectedDateEnd) - new Date(selectedDateStart) < 0) {
            toast.error('Дата начала больше даты конца');
            return true;
        }

        if (new Date(selectedDateStart) - new Date() < 0) {
            toast.error('Дата начала не может быть в прошлом');
            return true;
        }

        return false;
    }

    saveSelection = () => {
        const {saveSelection, createNewSelection, getMenuData, getTestsForSelection} = this.props;
        const {selectionId, selectionTitle, selectedDateStart, selectedDateEnd, isPageCreateSelection, selectionDescription} = this.state;

        let error = this.validate();

        if (error) {
            return;
        }

        if (isPageCreateSelection) {
            createNewSelection({
                selectionTitle,
                selectionDescription,
                selectionStartDate: selectedDateStart,
                selectionEndDate: selectedDateEnd
            });

            this.setState({isPageCreateSelection: false});
            return;
        }

        saveSelection({
            selectionTitle,
            selectionDescription,
            selectionStartDate: selectedDateStart,
            selectionEndDate: selectedDateEnd
        }, selectionId);

        setTimeout(() => {
            if (selectionId) {
                getMenuData(selectionId);
            }
        }, 100); // подумать как убрать - по завершению setTestExisting
        setTimeout(() => {
            getTestsForSelection(selectionId);
        }, 100); // подумать как убрать - по завершению setTestExisting
    };

    handleClickAdd = event => {
        this.setState({anchorEl: event.currentTarget});
    }
}

function mapStateToProps(state) {
    return {
        allTest: state.selection.allTest,
        selection: state.selection.selection,
        testForSelection: state.selection.testForSelection,
        redirectToHomeSelection: state.selection.redirectToHomeSelection,
        errorMsgSelection: state.selection.errorMsgSelection
    };
}

const mapDispatchToProps = (dispatch) => ({
    setTestExisting: (selectionId, testId) => dispatch(setTestExisting(selectionId, testId)),
    getAllTest: () => dispatch(getAllTest()),
    getSelectionInfo: (selectionId) => dispatch(getSelectionInfo(selectionId)),
    getTestsForSelection: (selectionId) => dispatch(getTestsForSelection(selectionId)),
    saveSelection: (selection, selectionId) => dispatch(saveSelection(selection, selectionId)),
    deleteSelection: (selectionId) => dispatch(deleteSelection(selectionId)),
    createNewSelection: (selection) => dispatch(createNewSelection(selection)),
    getMenuData: (selectionId) => dispatch(getMenuData(selectionId)),
});

export default withToast(connect(mapStateToProps, mapDispatchToProps)(SelectionPage));
