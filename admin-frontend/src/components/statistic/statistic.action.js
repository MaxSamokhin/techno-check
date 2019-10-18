import {GET_QUESTION_STATISTIC,} from './statistic.constant.js';
import Http from '../../service/http';
import handleError from '../../service/handleError';


const getQuestionStatisticAction = (statistic) => ({
    type: GET_QUESTION_STATISTIC,
    payload: statistic
});


export function getQuestionStatistic(questionId) {
    return (dispatch) => {
        Http.get(`api/admin/statistics/question/${questionId}`)
            .then(res => {


                if (res.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error getQuestionStatistic', res);
                    handleError(res);
                    dispatch(getQuestionStatisticAction(null));
                    return;
                }

                console.log('getQuestionStatistic', res);

                dispatch(getQuestionStatisticAction(res));
            })
            .catch((err) => {
                console.log(err);
                // dispatch(testSetError(err));
            });
    };
}
