import React from 'react';

import PropTypes from 'prop-types';
import './answers-item.less';
import Answer from './answer/answer.jsx';
// import {isEmptyArray} from '../../../service/isEmptyArray';

export default class AnswersItem extends React.Component {
    constructor(props) {
        super(props);

        this.onClickDelete = this.onClickDelete.bind(this);
    }

    render() {
        console.log('AnswersItem', this.props.answers);

        const itemBlock = this._getItem();

        return (
            <React.Fragment>
                <span className='answer-items__text'> Варианты ответа: </span>
                {itemBlock}
            </React.Fragment>
        );
    }

    _getItem() {
        const {
            answers,
            handleDeleteItem,
            questionId,
            categoryId,
            handleChangeAnswerItem,
            handleChangeScoreAnswer
        } = this.props;

        return answers.map(({answerId, answerTitle, answerScore}) => (
            <Answer
                key={answerId}
                answerTitle={answerTitle}
                answerScore={answerScore + ''}
                handleDeleteItem={handleDeleteItem}
                questionId={questionId}
                categoryId={categoryId}
                answerId={answerId + ''}
                handleChangeAnswerItem={handleChangeAnswerItem}
                handleChangeScoreAnswer={handleChangeScoreAnswer}
            />
        ));
    }

    onClickDelete() {
        console.log('onClickSave');
    }
}

AnswersItem.propTypes = {
    answers: PropTypes.array,
    handleAddItem: PropTypes.func,
    handleDeleteItem: PropTypes.func,
    categoryId: PropTypes.any,
    questionId: PropTypes.any,
    handleChangeAnswerItem: PropTypes.func,
    handleChangeScoreAnswer: PropTypes.func
};
