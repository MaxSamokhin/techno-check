export const isValidTest = (testTitle, testLimit) => {
    if (testTitle === '') {
        return false;
    }

    if (testLimit === '00:00:00' || !testLimit) {
        return false;
    }

    return true;
};

export const isValidCategory = (categoryTitle) => {
    return categoryTitle !== '';
};

export const isValidQuestion = (questionTitle, questionType) => {
    if (questionTitle === '' || questionType === '') {
        return false;
    }

    return true;
};

export const isValidStartAndEndDate = (startTime, endTime) => {
    // let startTimeDate = convertDateToUTC(new Date(startTime));
    // let endTimeDate = convertDateToUTC(new Date(endTime));
    // let nowDate = convertDateToUTC(new Date());

    console.log('isValidStartAndEndDate', startTime.toString(), endTime.toString());

    // if (startTimeDate > endTimeDate) {
    //     return false;
    // }

    // if (nowDate > startTimeDate) { // опрос идёт или уже прошёл
    //     return false;
    // }

    // TODO: Lol.

    return true;
};

export const isValidScore = (answers) => {
    let isNotError = true;
    answers.forEach(elem => {
        if (elem.answerScore === '' ||
            elem.answerScore < 0 ||
            elem.answerScore > 10 ||
            !isInteger(+elem.answerScore)) {
            isNotError = false;
        }
    });

    return isNotError;
};

export const isValidAnswerItem = (answers) => {
    let isNotError = true;

    console.log('isValidAnswerItem', answers);

    answers.forEach(elem => {
        if (elem.answerTitle === '') {
            isNotError = false;
        }
    });

    return isNotError;
};

const isInteger = (num) => {
    return (num ^ 0) === num;
};

// const convertDateToUTC = (date) => {
//     return new Date(
//         date.getUTCFullYear(),
//         date.getUTCMonth(),
//         date.getUTCDate(),
//         date.getUTCHours(),
//         date.getUTCMinutes(),
//         date.getUTCSeconds()
//     );
// };
