import React from 'react';

import './answer-img.less';
import PropTypes from 'prop-types';

export default class AnswersImg extends React.Component {
    constructor() {
        super();

        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }

    render() {
        return (
            <div className='answer-img'>
                <input type='file' onChange={this.fileChangedHandler} />
            </div>
        );
    }

    fileChangedHandler(e) {
        const {handleSetAnswers} = this.props;
        const file = e.target.files[0];

        console.log(file);

        handleSetAnswers([file]);
    }
}

AnswersImg.propTypes = {
    handleSetAnswers: PropTypes.func
};
