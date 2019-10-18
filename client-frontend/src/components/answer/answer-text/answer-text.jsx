import React from 'react';
import PropTypes from 'prop-types';

import './answer-text.less';
// import Input from '../../input/input.jsx';
import TextField from '@material-ui/core/TextField';


export default class AnswerText extends React.Component {
    state = {
        text: ''
    }

    handleChange = event => {
        this.state.text = event.target.value;
        this.props.handleChangeTextAnswer(event);
    }

    render() {
        return (
            <TextField
                id='text-field'
                className='answer-text__text-field'
                multiline={true}
                autoFocus={true}
                fullwidth={true}
                value={this.state.name}
                onChange={this.handleChange}
                margin='normal'
                variant='outlined'
            />
        );
    }
}

AnswerText.propTypes = {
    textAnswer: PropTypes.string,
    handleChangeTextAnswer: PropTypes.func,
};
