import {
    HOME_TEST_LOADING, HOME_TEST_STOP_LOADING,
    HOME_TEST_SUCCESS,
    // HOME_TEST_ERROR_SERVER
} from './test-home.constant';

import Http from '../../service/http';
import handleError from '../../service/handleError';

const testLoadingHome = () => ({
    type: HOME_TEST_LOADING,
});

export const testSuccessHome = (test) => ({
    type: HOME_TEST_SUCCESS,
    payload: test
});

export const testHomeStopLoading = () => ({
   type: HOME_TEST_STOP_LOADING 
});

// const testSetErrorHome = (err) => ({
//     type: HOME_TEST_ERROR_SERVER,
//     payload: err
// });

export function getTestHome() {
    return (dispatch) => {
        dispatch(testLoadingHome());
            Http.get('api/admin/testing/tests')
                .then(test => {

                    // if (test.error === 'unauthorized') {
                    //     dispatch(testSetErrorHome());
                    //     return;
                    // }

                    if (test.status === 'error') {
                        // if (res.hasOwnProperty('selectionTitle')) {
                        //     dispatch(setErrorSelection(res.selectionTitle[0]));
                        // }
                        //
                        // if (res.hasOwnProperty('selectionStartDate')) {
                        //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                        // }
                        console.log('error deleteTest');
                        console.log(test);

                        handleError(test);
                        dispatch(testHomeStopLoading());

                        return;
                    }

                    console.log('getTest');
                    console.log(test);

                    dispatch(testSuccessHome(test));
                })
                .then(() => dispatch(testHomeStopLoading()))
                .catch((err) => {
                    console.log(err);
                    // dispatch(testSetErrorHome(err));
                });
    };
}
