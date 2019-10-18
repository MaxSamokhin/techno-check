import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../../input/input.jsx';
import Button from '../../../button/button.jsx';

import './answer.less';

export default class Answers extends React.Component {
    constructor(props) {
        super(props);

        this.clickDeleteItem = this.clickDeleteItem.bind(this);
        this.handleChangeValueItem = this.handleChangeValueItem.bind(this);
        this.handleChangeScoreItem = this.handleChangeScoreItem.bind(this);
    }

    render() {
        const {
            answerTitle,
            answerScore,
        } = this.props;

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

                <div className='answer-items__button'>
                    <Button
                        text={'×'}
                        style={'delete'}
                        handleClick={this.clickDeleteItem}
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

    clickDeleteItem() {
        const {handleDeleteItem, questionId, categoryId, answerId} = this.props;
        handleDeleteItem(questionId, categoryId, answerId);
    }

}

Answers.propTypes = {
    answerId: PropTypes.any,
    answerTitle: PropTypes.string,
    answerScore: PropTypes.string,
    categoryId: PropTypes.any,
    questionId: PropTypes.any,
    handleDeleteItem: PropTypes.func,
    handleChangeAnswerItem: PropTypes.func,
    handleChangeScoreAnswer: PropTypes.func
};
