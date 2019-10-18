import React from 'react';

import './answer-text.less';
import PropTypes from 'prop-types';
import Input from '../../input/input.jsx';

export default class AnswersText extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeValueItem = this.handleChangeValueItem.bind(this);
        this.handleChangeScoreItem = this.handleChangeScoreItem.bind(this);
    }

    render() {
        const {
            answerTitle,
            answerScore,
            answerId
        } = this.props;

        console.log('AnswersText', answerTitle, answerScore, answerId);

        return (
            <div className='answer-items'>
                <div className='answer-items__input'>
                    <Input
                        type={'text'}
                        placeholder={'Введите вариант ответа'}
                        value={answerTitle}
                        handleChange={this.handleChangeValueItem}
                    />
                </div>

                <div className='answer-items__score'>
                    <Input
                        type={'text'}
                        placeholder={'Балл'}
                        value={answerScore + ''}
                        handleChange={this.handleChangeScoreItem}
                    />
                </div>
            </div>
        );
    }

    handleChangeScoreItem(e) {
        const {handleChangeScoreAnswer, answerId} = this.props;
        handleChangeScoreAnswer(e, answerId);
    }

    handleChangeValueItem(e) {
        const {handleChangeAnswerItem, answerId} = this.props;
        handleChangeAnswerItem(e, answerId);
    }
}

AnswersText.propTypes = {
    handleChangeValueItem: PropTypes.func,
    handleChangeScoreItem: PropTypes.func
};
