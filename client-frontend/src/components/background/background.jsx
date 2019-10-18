import React from 'react';
import './background.less';

const Background = (props) => {
    return (
        <div className='background'>
            <p>hello</p>
            {props.children}
        </div>
    );
};

export default Background;
