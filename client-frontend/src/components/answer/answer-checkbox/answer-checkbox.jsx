import React from 'react';
import PropTypes from 'prop-types';
// import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import './answer-checkbox.less';

export default class AnswerCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        for (const i in this.props.questionAnswers) {
            this.state[this.props.questionAnswers[i].answerId] = false;
        }
    }

    handleChange = answerId => event => {
        this.setState({[answerId]: event.target.checked});
        this.props.setAnswer(event);
    }

    render() {
        const options = this.getOptionsBlock();

        return (
            <div className='answer-checkbox'>
                <FormControl component='fieldset' className={'answer-checkbox__form-control'}>
                    <FormGroup>
                        {options}
                    </FormGroup>
                </FormControl>
            </div>
        );
    }

    getOptionsBlock() {
        return this.props.questionAnswers.map(({answerId, answerTitle}) => {
            return (
            <FormControlLabel
                key={answerId}
                control={
                    <Checkbox
                        checked={this.state[answerId]}
                        onChange={this.handleChange(answerId)}
                        value={'' + answerId}
                        />
                }
                label={answerTitle}
                />
            );
        });
    }
}

AnswerCheckbox.propTypes = {
    answers: PropTypes.array,
    setAnswer: PropTypes.func,
};
