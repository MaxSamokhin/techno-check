import React from 'react';
import PropTypes from 'prop-types';

import './answer-radio.less';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class AnswerRadio extends React.Component {
    state = {
        value: '',
    };

    handleChange = event => {
        this.setState({value: event.target.value});
        this.props.setAnswer(event);
    };

    render() {
        const options = this.getOptionsBlock();

        return (
            <div className='answer-radio'>
                <FormControl component='fieldset' className={'answer-radio__form-control'}>
                    <RadioGroup
                        name='question1'
                        className={'answer-radio__grpup'}
                        value={this.state.value}
                        onChange={this.handleChange}
                        >
                        {options}
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }

    getOptionsBlock() {
        const {questionAnswers, setAnswer, selectedValue} = this.props;

        console.log('AnswerText getOptionsBlock', setAnswer, questionAnswers, selectedValue);

        return questionAnswers.map(({answerId, answerTitle}) => {

            console.log(answerId,selectedValue);

            return (
                <FormControlLabel key={answerId} value={'' + answerId} control={<Radio />} label={answerTitle} />
            );
        });
    }
}

AnswerRadio.propTypes = {
    questionAnswers: PropTypes.array,
    setAnswer: PropTypes.func,
    selectedValue: PropTypes.any
};
