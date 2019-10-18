import React from 'react';
import PropTypes from 'prop-types';

import './card.less';

import Input from '../input/input.jsx';
// import LinkButton from '../link-button/link-button.jsx';
import Button from './../button/button.jsx';
import {generateId} from '../../service/generate-id';
import QuestionPopup from './../question-popup/question-popup.jsx';


export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryTitle: this.props.categoryTitle,
            isChanged: false,
        };

        this.clickSaveCard = this.clickSaveCard.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.clickDeleteCategory = this.clickDeleteCategory.bind(this);
        // this.clickDeleteQuestion = this.clickDeleteQuestion.bind(this);
    }


    render() {
        const {categoryTitle} = this.state;
        const {categoryId} = this.props;

        const questionsBlock = this._getListQuestion();

        console.log('CARD', categoryId);

        const isDisabled = this.state.categoryTitle === '';

        return (
            <div className='card'>
                <div className='card__header'>
                    <div className='card__input'>
                        <Input
                            type={'text'}
                            placeholder={categoryTitle || 'Название категории'}
                            handleChange={(e) => {this.onChangeInput(e); this.setState({isChanged: true});}}
                            value={categoryTitle}
                            fieldName={'categoryTitle'}
                            onBlur={(e) => {if (this.state.isChanged) {this.clickSaveCard(e); this.setState({isChanged: false});} }}
                        />
                    </div>

                    <div className='card__delete-button'>
                        <Button
                            text={'×'}
                            style={'delete'}
                            handleClick={this.clickDeleteCategory}
                        />
                    </div>
                </div>

                <ul className='card__question'>
                    {questionsBlock}
                </ul>

                <div className='card__buttons'>
                    <div className='card__add-button'>
                        <QuestionPopup
                            trigger={
                                <div>
                                    <Button
                                        style={'default'}
                                        text={isDisabled ? 'Введите название' : 'Добавить вопрос'}
                                        isDisabled={isDisabled}
                                    />
                                </div>
                            }
                            categoryId={categoryId}
                            questionId={null}
                            isDisabled={isDisabled}
                            questionTitle={'Oh no, you see me'}
                        />
                    </div>
                </div>
            </div>
        );
    }

    clickDeleteQuestion(questionId) {
        const {handleDeleteQuestion,inquirerId, categoryId, testId} = this.props;
        handleDeleteQuestion(inquirerId, categoryId, testId, questionId);
    }

    clickDeleteCategory() {
        const {handleDeleteCategory,inquirerId, categoryId, testId} = this.props;
        handleDeleteCategory(inquirerId, categoryId, testId);
    }

    onChangeInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    clickSaveCard() {
        console.log('@cSC', this.props.inquirerId, this.props.testId, this.props.categoryId);

        const {categoryTitle} = this.state;
        let {
            inquirerId,
            testId,
            categoryId,
            handleSaveCategory,
            handleChangeCategory
        } = this.props;

        testId = testId ? testId + '' : generateId();
        categoryId = categoryId ? categoryId + '' : generateId();

        if (categoryId.substr(0, 1) !== '_') {
            handleChangeCategory(inquirerId, testId, categoryId, categoryTitle);
            return;
        }

        handleSaveCategory(inquirerId, testId, categoryId, categoryTitle);
        console.log('testId, categoryId', testId, categoryId);
    }

    getTruncateText(text, length) {
        return text.length > length ?
            text.slice(0, length - 3) + '...' :
            text;
    }

    _getListQuestion() {
        const {categoryId} = this.props;
        return this.props.questions.map(({questionId, questionTitle}) => {
            return <li className='card__question-item' key={questionId}>
                <QuestionPopup
                    trigger={
                        <a className='popup-link-trigger'>
                            {questionTitle.slice(0, 32)}
                        </a>
                    }
                    questionTitle={questionTitle}
                    categoryId={categoryId}
                    questionId={questionId}
                />

                <Button
                    text={'×'}
                    style={'delete'}
                    handleClick={this.clickDeleteQuestion.bind(this, questionId)}
                />
            </li>;
        });
    }
}

Card.propTypes = {
    categoryTitle: PropTypes.string,
    questions: PropTypes.array,
    handleSaveCategory: PropTypes.func,
    handleChangeCategory: PropTypes.func,
    testId: PropTypes.any,
    inquirerId: PropTypes.any,
    categoryId: PropTypes.any,
    handleDeleteCategory: PropTypes.func,
    handleDeleteQuestion: PropTypes.func
};
