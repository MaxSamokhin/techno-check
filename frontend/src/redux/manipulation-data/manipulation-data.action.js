import {
    SAVE_DATA,
    EXPORT_DATA,
    RESET
} from './manipulation-data.constant';

const saveDataAction = () => ({
    type: SAVE_DATA,
});

const exportDataAction = () => ({
    type: EXPORT_DATA
});


const resetAction = () => ({
    type: RESET
});

export function saveData() {
    return (dispatch) => {
        dispatch(saveDataAction());
    };
}

export function exportData() {
    return (dispatch) => {
        dispatch(exportDataAction());
    };
}

export function resetData() {
    return (dispatch) => {
        dispatch(resetAction());
    };
}

export function saveDataInBack(data) {
    return () => {

        console.log(data)

        // Http.post(``)
        //   .then(questions => {
        //       dispatch(questionsByQuestionSuccess(questions));
        //   })
        //   .then(() => dispatch(questionsStopLoading()))
        //   .catch((err) => {
        //       console.log(err);
        //       // dispatch(menuSetError(err));
        //   });
    };
}

export function exportDataInBackEnd(data) {
    return () => {

        console.log(data);

        // Http.post(``)
        //   .then(questions => {
        //       dispatch(questionsByQuestionSuccess(questions));
        //   })
        //   .then(() => dispatch(questionsStopLoading()))
        //   .catch((err) => {
        //       console.log(err);
        //       // dispatch(menuSetError(err));
        //   });
    };
}
