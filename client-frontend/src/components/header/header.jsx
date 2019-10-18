import React from 'react';
import './header.less';

import { ToastContainer } from 'react-toastify';

const Header = () => {
    return (
        <header className={'header'}>
            <div className='header__title'>

            </div>

            <ToastContainer autoClose={2000} />

        </header>
    );
};

export default Header;
