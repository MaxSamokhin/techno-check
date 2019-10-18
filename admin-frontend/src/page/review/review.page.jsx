import React from 'react';
import {connect} from 'react-redux';
import './review.page.less';
import {getReviewListBySelection, setScoreForReview} from './review.action';
import FlipMove from 'react-flip-move';
import ReviewCard from '../../components/review-card/review-card.jsx';

class ReviewPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listForReview: null
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.listForReview !== prevProps.listForReview ||
            this.props.listForReview.some((elem, i) => (
                Array.isArray(prevProps) &&
                prevProps[i].hasOwnProperty('questionAnswers') &&
                prevProps[i].questionAnswers[0].hasOwnProperty('answerScore')) ?
                elem.questionAnswers[0].answerScore !== prevProps[i].questionAnswers[0].answerScore :
                false)
        ) {

            const listForReview = this.props.listForReview;

            console.log('componentDidUpdate');
            console.log(listForReview);

            this.setState((state) => {
                return {
                    ...state,
                    listForReview
                };
            });
        }
    }

    componentDidMount() {
        const {getReviewListBySelection} = this.props;
        const {selectionId} = this.props.match.params;

        console.log('selectionId componentDidMount');
        console.log(selectionId);

        getReviewListBySelection(selectionId);
    }

    render() {
        const {listForReview} = this.state;
        const compareScores = (a, b) => {
            const aa = a.questionAnswers[0].answerIsChecked;
            const bb = b.questionAnswers[0].answerIsChecked;
            return aa - bb;
        };
        return (
                <FlipMove className='reviews'>
                {
                    listForReview &&
                    listForReview.sort(compareScores).map((review, index) =>
                        <div className='reviews__review' key={review.userQuestionId}>
                            <ReviewCard
                                index={index}
                                propsRef={this.pageRef}
                                questionTitle={review.questionTitle}
                                questionText={review.questionText}
                                questionAnswers={review.questionAnswers}
                                questionDefaultScore={review.questionDefaultScore}
                                numberFieldOnChange={this.handleChangeScore.bind(this, review.userQuestionId)}
                                saveScore={this.saveReviewScore.bind(this, [review.userQuestionId, review.questionAnswers[0].answerScore, review.questionDefaultScore])}
                                saveScoreMax={this.saveReviewScore.bind(this, [review.userQuestionId, review.questionDefaultScore, review.questionDefaultScore])}
                                saveScoreMin={this.saveReviewScore.bind(this, [review.userQuestionId, 0, review.questionDefaultScore])}
                            />
                        </div>
                    )
                }
                </FlipMove>
        );
    }

    handleChangeScore = (userQuestionId, e) => {
        let {listForReview} = this.state;
        let index = listForReview.findIndex((elem) => userQuestionId === elem.userQuestionId);
        let newListForReview = [...listForReview];

        newListForReview[index].questionAnswers[0].answerScore = e;

        this.setState({listForReview: newListForReview});
    };

    saveReviewScore([userQuestionId, localScore, maxScore]) {
        localScore = localScore > maxScore ? maxScore : localScore;
        localScore = localScore < 0 ? 0 : localScore;

        const {setScoreForReview} = this.props;
        let {listForReview} = this.state;

        console.log('localScore');
        console.log(localScore);

        let index = listForReview.findIndex(elem => elem.userQuestionId === userQuestionId);
        listForReview[index].checked = true;
        listForReview[index].questionAnswers[0].answerScore = localScore;
        listForReview[index].questionAnswers[0].answerIsChecked = true;
        let newListForReview = listForReview;

        setScoreForReview(userQuestionId, {answerScore: localScore});

        this.setState({listForReview: newListForReview});
    }
}

function mapStateToProps(state) {
    return {
        listForReview: state.review.listForReview,
    };
}

const mapDispatchToProps = (dispatch) => ({
    getReviewListBySelection: (selectionId) => {
        dispatch(getReviewListBySelection(selectionId));
    },
    setScoreForReview: (userQuestionId, score) => dispatch(setScoreForReview(userQuestionId, score))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage);
