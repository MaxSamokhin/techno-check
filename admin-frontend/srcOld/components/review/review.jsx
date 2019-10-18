import React from 'react';
import PropTypes from 'prop-types';


import './review.less';
import Select from '../select/select.jsx';
import Button from '../button/button.jsx';

export default class Review extends React.Component {
    constructor() {
        super();

        this.handleSelect = this.handleSelect.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    render() {

        const {
            questionTitle,
            questionType,
            user,
            score,
            answers
        } = this.props;

        return (
        <div className='review-content'>
            {
                questionType === 'VIDEO' &&
                <div className='review-content__elem'>
                    <video src=''>Видео</video>
                </div>
            }
            {
                questionType === 'TEXT' &&
                <React.Fragment>
                    <div className='review-content__text'>
                        Вопроc: {questionTitle}
                    </div>
                    <div className='review-content__user'>
                        Пользователь: {user.email}
                    </div>
                    <div className='review-content__answer'>
                        Ответ: {answers[0].answerText}
                    </div>
                </React.Fragment>
            }
            <div className='review-content__menu'>
                <div className='review-content__menu-select'>
                    <Select
                        options={[
                            {
                                label: '0 Баллов',
                                value: '0'
                            },
                            {
                                label: '1 Балл',
                                value: '1'
                            },
                            {
                                label: '2 Балла',
                                value: '2'
                            },
                            {
                                label: '3 Балла',
                                value: '3'
                            },
                            {
                                label: '4 Балла',
                                value: '4'
                            },
                            {
                                label: '5 Баллов',
                                value: '5'
                            },
                            {
                                label: '6 Баллов',
                                value: '6'
                            },
                            {
                                label: '7 Баллов',
                                value: '7'
                            },
                            {
                                label: '8 Баллов',
                                value: '8'
                            },
                            {
                                label: '9 Баллов',
                                value: '9'
                            },
                            {
                                label: '10 Баллов',
                                value: '10'
                            }
                        ]}
                        handleSelect={this.handleSelect}
                        typeSelect={score}
                    />
                </div>

                <div className='review-content__menu-button'>
                    <Button
                        text={'Сохранить'}
                        type={'success'}
                        handleClick={this.onClickSave}
                    />
                </div>
            </div>

        </div>
        );
    }

    onClickSave() {
        const {handleSaveScore, questionId, score, userQuestionId} = this.props;
        console.log(score);
        handleSaveScore(questionId, userQuestionId, score);
    }

    handleSelect(e) {
        const {handleChangeScore, questionId} = this.props;
        handleChangeScore(e.target.value, questionId);
    }
}

Review.propTypes = {
    answers: PropTypes.any,
    questionId: PropTypes.any,
    questionManual: PropTypes.any,
    questionTitle: PropTypes.any,
    questionType: PropTypes.any,
    user: PropTypes.any,
    score: PropTypes.any,
    handleChangeScore: PropTypes.any,
    handleSaveScore: PropTypes.any,
    userQuestionId: PropTypes.any
};
