import React from 'react';
import './header.less';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import {Link} from 'react-router-dom';
import {MENU_ITEMS} from './header.constant';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import {logOut} from '../../page/login/login.action';
import connect from 'react-redux/es/connect/connect';
import {fromSelectionPage, fromTestPage} from '../route/route.action';
import {ToastContainer} from 'react-toastify';

class Header extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        if (value === 0) {
            this.props.fromSelectionPage();
        }

        if (value === 1) {
            this.props.fromTestPage();
        }

        this.setState({value});
    };

    handleLogOut = () => {
        this.props.logOut();
    };

    render() {
        const {value} = this.state;

        return (<AppBar position={'static'}
                        className={'header__wrapper'}>
            <Toolbar className={'header'}>
                <Tabs value={value}
                      onChange={this.handleChange}
                      variant={'fullWidth'}
                      className={'header__tabs'}>
                    {
                        MENU_ITEMS.map(menuItem => (
                            <Tab
                                label={menuItem.text}
                                key={menuItem.text}
                                component={Link}
                                to={menuItem.pathTo}
                            />
                        ))
                    }
                </Tabs>

                <Button color='inherit'
                        className={'header__button'}
                        onClick={this.handleLogOut}>
                    Выйти
                </Button>
            </Toolbar>

            <ToastContainer autoClose={2000} />
        </AppBar>);
    }
}

function mapStateToProps(state) {
    return {
        isSuperuser: state.login.isSuperuser,
    };
}

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(logOut()),
    fromSelectionPage: () => dispatch(fromSelectionPage()),
    fromTestPage: () => dispatch(fromTestPage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
