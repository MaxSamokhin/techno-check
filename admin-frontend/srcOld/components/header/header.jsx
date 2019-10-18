import React from 'react';

import LinkButton from '../link-button/link-button.jsx';
import Button from '../button/button.jsx';
import {MENU_ITEMS} from '../../constants/header.constant';

import './header.less';
import {connect} from 'react-redux';
import {logOut} from '../../actions/login.action';

import { ToastContainer } from 'react-toastify';

class Header extends React.Component {
    render() {

        const {isSuperuser, logOut} = this.props;
        const menuItems = this._getMenuItems();

        return (
            isSuperuser && <header className={'header'}>
                <ul className={'header__menu'}>

                    {menuItems}

                    <li className={'header__menu-item'}>
                        <Button
                            text={'Выход'}
                            size={'medium'}
                            type={'default'}
                            handleClick={logOut}
                        />
                    </li>

                    <ToastContainer autoClose={2000} />

                </ul>

            </header>

        );
    }

    _getMenuItems() {
        return MENU_ITEMS.map((item, index) => {
            const styleItem = `header__menu-item ${
                item.center ? item.center : ''
                }`;

            return <li className={styleItem} key={index}>
                {
                    !item.center ?
                        <LinkButton
                            to={item.pathTo}
                            text={item.text}
                            size={item.size}
                            style={item.type}
                        /> : ''
                }
            </li>;
        });
    }
}   


const mapStateToProps = state => {
    return {
        isSuperuser: state.login.isSuperuser,
    };
};

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(logOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
