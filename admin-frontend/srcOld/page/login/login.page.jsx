import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import './login.page.less';
import Button from '../../components/button/button.jsx';
import Input from '../../components/input/input.jsx';

import {logIn} from '../../actions/login.action';
import {INQUIRER} from '../../constants/routes-map.constant';

//TODO доделать вывод ошибок с сервера и ошибки формы

class LoginPage extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    render() {
        const {email, password} = this.state;
        const {errorMsg, isSuperuser} = this.props;
        const isDisabled = this.validate();

        if (isSuperuser) {
            return <Redirect to={INQUIRER}/>;
        }

        return (
            <div className='login__wrapper'>
                <div className='login'>
                    <div className='login__background'>
                        <div className='login__title'>
                            Добро пожаловать
                        </div>
                        <form className='login__form' onSubmit={this.handleSubmit}>
                            <div className='login__form-error'>
                                {errorMsg && <p>{errorMsg}</p>}
                            </div>
                            <div className='login__form-input'>
                                <Input
                                    type={'email'}
                                    fieldName={'email'}
                                    placeholder={'Почта'}
                                    handleChange={this.handleChange}
                                    value={email}
                                />
                            </div>

                            <div className='login__form-input'>
                                <Input
                                    type={'password'}
                                    fieldName={'password'}
                                    placeholder={'Пароль'}
                                    handleChange={this.handleChange}
                                    value={password}
                                />
                            </div>

                            <div className='login__form-button'>

                                <Button
                                    text={'Войти'}
                                    isDisabled={!isDisabled}
                                    style={'success'}
                                    type={'submit'}
                                />

                            </div>
                        </form>
                    </div>
                </div>
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
            return false;
        }
        if (!this.testEmail(email)) {
            return false;
        }

        return true;
    }

    handleChange(e) {
        const value = e.currentTarget.value;
        const fieldName = e.currentTarget.dataset.fieldName;

        this.setState({
            [fieldName]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const {email, password} = this.state;

        this.props.logIn({email, password});
    }
}

function mapStateToProps(state) {
    return {
        isSuperuser: state.login.isSuperuser,
        errorMsg: state.login.errorMsg,
        isLoading: state.login.isLoading
    };
}

const mapDispatchToProps = (dispatch) => ({
    logIn: (params) => dispatch(logIn(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
