import React from 'react';
import {connect} from 'react-redux';
import {getUserList, loadOneUser, loadUserFromFile} from './users.action';
import './users.page.less';
import {withToast} from 'material-ui-toast-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {DropzoneArea} from 'material-ui-dropzone';

class UsersPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userList: [],
            openDialog: false,
            openTabValue: 0,
            files: [],
            email: '',
            username: '',
            name: ''
        };
    }

    componentDidMount() {
        const {getUserList} = this.props;
        const {selectionId} = this.props.match.params;

        getUserList(selectionId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.userList !== prevProps.userList) {

            const {userList} = this.props;

            this.setState((state) => {
                return {
                    ...state,
                    userList: userList
                };
            });
        }
    }

    render() {
        const {userList, openDialog, openTabValue} = this.state;
        const {name, username, email} = this.state;

        return (<div className='users'>
            <Fab color='primary'
                 aria-label='Add'
                 onClick={this.handleClickOpenDialog}
                 className={'users__icon'}>
                <AddIcon/>
            </Fab>
            <div className='users__table-wrapper'>
                <Table className={'users__table'}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !!userList && userList.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {user.email}
                                    </TableCell>
                                    <TableCell>
                                        {user.username}
                                    </TableCell>
                                    <TableCell>
                                        {user.name}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>


            <Dialog
                className={'users__dialog'}
                onClose={this.handleCloseDialog}
                aria-labelledby='customized-dialog-title'
                open={openDialog}>
                <header className='users__dialog-header'>
                    <Typography variant='h6'>Добавление пользователей</Typography>
                    <IconButton aria-label='Close'
                                onClick={this.handleCloseDialog}>
                        <CloseIcon/>
                    </IconButton>
                </header>

                <DialogContent className={'users__dialog-content'}>
                    <AppBar position='static' color='default'>
                        <Tabs
                            value={openTabValue}
                            onChange={this.handleChangeTab}
                            indicatorColor='primary'
                            textColor='primary'
                            variant='fullWidth'
                        >
                            <Tab label='Добавить одного пользователя'/>
                            <Tab label='Загрузить из файла'/>
                        </Tabs>
                    </AppBar>
                    {openTabValue === 0 &&
                    <section className={'users__dialog-content-item _one'}>
                        <TextField
                            id='filled-email-input'
                            label='Почта'
                            type='email'
                            name='email'
                            autoComplete='email'
                            margin='normal'
                            variant='filled'
                            onChange={this.handleChange('email')}
                            value={email}
                        />
                        <TextField
                            id='filled-email-input'
                            label='Полное имя'
                            type='username'
                            name='username'
                            margin='normal'
                            variant='filled'
                            onChange={this.handleChange('username')}
                            value={username}
                        />
                        <TextField
                            id='filled-email-input'
                            label='Имя'
                            type='name'
                            name='name'
                            margin='normal'
                            variant='filled'
                            onChange={this.handleChange('name')}
                            value={name}
                        />

                        <Button variant='contained'
                                size='medium'
                                color='primary'
                                onClick={this.handleSaveUser}>
                            Сохранить пользователя
                        </Button>
                    </section>}
                    {openTabValue === 1 &&
                    <section className={'users__dialog-content-item'}>
                        <DropzoneArea
                            onChange={this.handleChangeFiles}
                        />
                        <Button variant='contained'
                                size='medium'
                                color='primary'
                                onClick={this.loadUserFromFile}>
                            Загрузить пользователей
                        </Button>
                    </section>}
                </DialogContent>
            </Dialog>
        </div>);
    }

    loadUserFromFile = () => {
        const {files} = this.state;
        const {openToast, loadUserFromFile, getUserList} = this.props;
        const {selectionId} = this.props.match.params;

        if (!files.length) {
            openToast({
                messages: ['Файл не выбран'],
                type: 'error',
                autoHideDuration: 4000,
            });
            return;
        }

        loadUserFromFile(selectionId, files[0]);
        setTimeout(() => {
            getUserList(selectionId);
        }, 500);

        this.handleCloseDialog();
    };

    handleChangeFiles = (files) => {
        this.setState({
            files: files
        });
    };

    handleSaveUser = () => {
        console.log('save user');
        const {username, name, email} = this.state;
        const {loadOneUser, getUserList} = this.props;
        const {selectionId} = this.props.match.params;

        loadOneUser(selectionId, {username, name, email});
        setTimeout(() => {
            getUserList(selectionId);
        }, 500);

        this.handleCloseDialog();
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangeTab = (event, value) => {
        this.setState({openTabValue: value});
    };

    handleClickOpenDialog = () => {
        this.setState({openDialog: true});
    };

    handleCloseDialog = () => {
        this.setState({openDialog: false});
    };
}

function mapStateToProps(state) {
    return {
        userList: state.users.userList,
    };
}

const mapDispatchToProps = (dispatch) => ({
    getUserList: (selectionId) => dispatch(getUserList(selectionId)),
    loadUserFromFile: (selectionId, file) => dispatch(loadUserFromFile(selectionId, file)),
    loadOneUser: (selectionId, user) => dispatch(loadOneUser(selectionId, user))
});

export default withToast(connect(mapStateToProps, mapDispatchToProps)(UsersPage));
