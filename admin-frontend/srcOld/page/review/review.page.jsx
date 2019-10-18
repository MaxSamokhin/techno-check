import React from 'react';

import Review from '../../components/review/review.jsx';
import './review.page.less';
import {connect} from 'react-redux';
import {
    getInquirers,
    getReviewAnswer,
    changeVisible,
    saveScore,
    changeScore
} from '../../actions/review.action.js';
import Collapsible from 'react-collapsible';
import {Loader} from 'semantic-ui-react';

// import {Loader} from 'semantic-ui-react';

class ReviewPage extends React.Component {
    componentDidMount() {
        this.props.getInquirers();
    }

    render() {
        const menu = this.getMenu();

        return (
            <div className='container'>
                <div className='review__wrapper'>
                    {menu}
                </div>
            </div>
        );
    }

    getMenu() {
        const {
            inquirers,
            isLoadingReviewData,
            answersForReview,
            changeScore,
            saveScore
        } = this.props;

        return (
            inquirers.map(({inquirerId, inquirerTitle, isVisible}) => {
                console.log('ReviewPage', isVisible);
                return (
                    <Collapsible
                        key={inquirerId}
                        trigger={<div className={'collapsible__text'}>{inquirerTitle}</div>}
                        classParentString='test__collapsible'
                        handleTriggerClick={this.clickExpandButton.bind(this, inquirerId)}
                        transitionTime={100}
                        open={isVisible}
                    >
                        {
                            answersForReview.length === 0 ?
                                <div>Нет ответов для проверки</div> :
                                !isLoadingReviewData ?
                                    answersForReview.map(({
                                                              answers,
                                                              questionId,
                                                              questionManual,
                                                              questionTitle,
                                                              questionType,
                                                              user,
                                                              userQuestionId
                                                          }, index) => (
                                        <Review
                                            key={index}
                                            answers={answers}
                                            questionId={questionId}
                                            questionManual={questionManual}
                                            questionTitle={questionTitle}
                                            questionType={questionType}
                                            user={user}
                                            userQuestionId={userQuestionId}
                                            score={answers[0].answerScore + ''}
                                            handleChangeScore={changeScore}
                                            handleSaveScore={saveScore}
                                        />
                                    )) :
                                    <Loader active inline='centered'/>
                        }

                    </Collapsible>
                );
            })
        );
    }

    clickExpandButton(inquirerId) {
        const {changeVisible, getReviewAnswer} = this.props;

        getReviewAnswer(inquirerId);
        changeVisible(inquirerId);
    }
}

function mapStateToProps(state) {
    return {
        inquirers: state.review.inquirers,
        isLoadingReviewData: state.review.isLoadingReviewData,
        answersForReview: state.review.answersForReview
    };
}

const mapDispatchToProps = (dispatch) => ({
    getInquirers: () => dispatch(getInquirers()),
    getReviewAnswer: (inquirerId) => dispatch(getReviewAnswer(inquirerId)),
    changeVisible: (inquirerId) => dispatch(changeVisible(inquirerId)),
    saveScore: (questionId, userAnswerId, score) => dispatch(saveScore(questionId, userAnswerId, score)),
    changeScore: (value, questionId) => dispatch(changeScore(value, questionId))

});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage);
