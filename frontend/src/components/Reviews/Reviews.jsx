import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import reviewCardByQuestionStyle from "assets/jss/material-dashboard-react/views/reviewCardByQuestionStyle.jsx";

import ReviewCardByUser from "components/Reviews/ReviewCardByUser.jsx";
import QuestionCard from "components/Reviews/QuestionCard.jsx";
import connect from "react-redux/es/connect/connect";

class Reviews extends React.Component {
    render() {
        const {groupByQuestion, groupByUser} = this.props;

        return (
            <div>
                {groupByUser && <ReviewCardByUser/>}
                {groupByQuestion && <QuestionCard/>}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        groupByQuestion: state.grouping.groupByQuestion,
        groupByUser: state.grouping.groupByUser,
    };
}


export default connect(mapStateToProps)(withStyles(reviewCardByQuestionStyle)(Reviews));
