import {RESULT_LOADING, RESULT_STOP_LOADING_RESULT, RESULT_SUCCESS} from './result.constant.js';
import Http from '../../service/http';
import handleError from '../../service/handleError';


const resultGetResultForSelection = data => ({
    type: RESULT_SUCCESS,
    payload: data
});

const resultLoadingResult = () => ({
    type: RESULT_LOADING
});

const resultStopLoadingResult = () => ({
    type: RESULT_STOP_LOADING_RESULT
});

export function getResultBySelection(selectionId) {
    return dispatch => {
        dispatch(resultLoadingResult());
        Http.get(`api/admin/results/selection/${selectionId}`)
            .then(res => {

                if (res.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error getResultBySelection', res);
                    handleError(res);
                    dispatch(resultStopLoadingResult());
                    return;
                }


                console.log('getResultBySelection');
                console.log(res);
                

                dispatch(resultGetResultForSelection(res));
            })
            .then(() => dispatch(resultStopLoadingResult()));
    };
}
