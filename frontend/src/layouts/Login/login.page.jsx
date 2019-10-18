import React from 'react';
import {connect} from 'react-redux';

import './login.page.less';

import {checkUser, logIn} from './login.action';
import {HOME} from '../../constant/routes-map.constant';
import {Redirect} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            wrongEmail: false,
            password: '',
            wrongPassword: false
        };
    }

    componentDidMount() {
        // проверить, что пользователь зашёл (isSuperuser)
        this.props.checkUser();
    }

    render() {
        const {email, password, wrongEmail, wrongPassword} = this.state;
        const {loginErrorMsg, isSuperuser, isAuth} = this.props;

        if (isSuperuser && isAuth) {
            console.log('redirect');
            return <Redirect to={HOME}/>;
        }

        return (
            <div className='login'>
                <form className='login__form'
                      onSubmit={this.handleSubmit}>

                    <div className='login__form-error'>
                        {loginErrorMsg && <p>{loginErrorMsg}</p>}
                    </div>

                    <TextField
                        id='outlined-email-input'
                        label='Почта'
                        type='email'
                        name='email'
                        autoComplete='email'
                        margin='normal'
                        variant='outlined'
                        required={true}
                        onChange={this.handleChange('email')}
                        value={email}
                        error={wrongEmail}
                    />

                    <TextField
                        id='outlined-password-input'
                        label='Пароль'
                        type='password'
                        autoComplete='current-password'
                        margin='normal'
                        variant='outlined'
                        required={true}
                        onChange={this.handleChange('password')}
                        value={password}
                        error={wrongPassword}
                    />

                    <Button
                        variant='contained'
                        size='large'
                        color='primary'
                        className={'login__form-button'}
                        type={'submit'}>
                        Войти
                    </Button>
                </form>
            </div>
        );
    }

    testEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    testPassword(password) {
        return !!password && password.length >= 4;
    }

    validate() {
        const {email, password} = this.state;

        if (!this.testPassword(password)) {
            this.setState({wrongPassword: true});
            return false;
        }
        if (!this.testEmail(email)) {
            this.setState({wrongEmail: true});
            return false;
        }

        return true;
    }

    handleChange = name => event => {
        if (name === 'email') {
            this.setState({wrongEmail: false});
        }

        if (name === 'password') {
            this.setState({wrongPassword: false});
        }

        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        if (!this.validate()) {
            return;
        }

        const {email, password} = this.state;

        this.props.logIn({email, password});
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.login.isAuth,
        isSuperuser: state.login.isSuperuser,
        loginErrorMsg: state.login.loginErrorMsg
    };
};

const mapDispatchToProps = (dispatch) => ({
    logIn: (params) => dispatch(logIn(params)),
    checkUser: () => dispatch(checkUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
