import {
    HOME_SELECTION_ERROR_SERVER,
    HOME_SELECTION_LOADING,
    HOME_SELECTION_STOP_LOADING,
    HOME_SELECTION_SUCCESS
} from './selection-home.constant';
import Http from '../../service/http';
import handleError from '../../service/handleError';

const selectionLoadingHome = () => ({
    type: HOME_SELECTION_LOADING,
});

export const selectionSuccessHome = (selections) => ({
    type: HOME_SELECTION_SUCCESS,
    payload: selections
});

const selectionSetErrorHome = (err) => ({
    type: HOME_SELECTION_ERROR_SERVER,
    payload: err
});

const selectionHomeStopLoading = () => ({
    type: HOME_SELECTION_STOP_LOADING
});

export function getSelectionHome() {
    return (dispatch) => {
        dispatch(selectionLoadingHome());

        setTimeout(() => { // debug loader

            Http.get('api/admin/testing/selection')
                .then(inquirer => {

                    // if (inquirer.error === 'unauthorized') {
                    //     dispatch(inquirerSetErrorHome());
                    //     return;
                    // }

                    if (inquirer.status === 'error') {
                        // if (res.hasOwnProperty('selectionTitle')) {
                        //     dispatch(setErrorSelection(res.selectionTitle[0]));
                        // }
                        //
                        // if (res.hasOwnProperty('selectionStartDate')) {
                        //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                        // }
                        console.log('error getSelectionHome');
                        console.log(inquirer);

                        handleError(inquirer);
                        dispatch(selectionHomeStopLoading());

                        return;
                    }

                    console.log('getSelectionHome');
                    console.log(inquirer);


                    dispatch(selectionSuccessHome(inquirer));
                })
                .then(() => dispatch(selectionHomeStopLoading()))
                .catch((err) => {
                    dispatch(selectionSetErrorHome(err));
                });

        }, 500);
    };
}
