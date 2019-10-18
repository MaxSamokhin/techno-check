import React from 'react';
import './not-found.less';

const NotFound = () => {
    return (
        <section className={'not-found'}>
            <div className='not-found__title'>
                <h2 >Страница не найдена</h2>
            </div>
            <p className={'not-found__hint'}>Проверьте ссылку на почте</p>
        </section>
    );
};

export default NotFound;
