import {
    QUESTION_LOADING,
    QUESTION_BY_USER_SUCCESS,
    QUESTION_BY_QUESTION_SUCCESS,
    QUESTION_STOP_LOADING
} from './question.constant.js';

import Http from 'service/http';

const questionsLoading = () => ({
    type: QUESTION_LOADING,
});

const questionsStopLoading = () => ({
    type: QUESTION_STOP_LOADING
});

const questionsByUserSuccess = (questions) => ({
    type: QUESTION_BY_USER_SUCCESS,
    payload: questions
});

const questionsByQuestionSuccess = (questions) => ({
    type: QUESTION_BY_QUESTION_SUCCESS,
    payload: questions
});

export function getQuestionByUser() {
    return (dispatch) => {

        const questions = [
            {
                name:'Name1',
                surname:'Surname1',
                countAnswersChecked: 1,
                score: 100,
                open: false, // добавлять на фронте
                answers: [
                    {
                        questionTitle: 'Question title blah-blah',
                        questionBody: 'Question body semper risus enim leo nunc mauris lacus tellus viverra posuere ',
                        answer: 'Answer eu in nunc sem ultrices duis scelerisque feugiat dictum egestas ',
                        score: 0,
                        lastReviewDate: 'Use some date thing please',
                        lastReviewEmail: 'example@example.com',
                        comment: '',
                    },
                    {
                        questionTitle: 'Question title blah-blah',
                        questionBody: 'Question body In quam Cursus amet ipsum Ut curabitur proin sed turpis ',
                        answer: 'Answer eu vitae turpis et in sed sit bibendum etiam tempus ',
                        score: 5,
                        lastReviewDate: 'Use some date thing please',
                        lastReviewEmail: 'example@example.com',
                        comment: 'Hello world',
                    },
                ]
            },
            {
                name:'Name2',
                surname:'Surname2',
                countAnswersChecked: 0,
                open: false, // добавлять на фронте
                answers: [
                    {
                        questionTitle: 'Question title blah-blah',
                        questionBody: 'Question body semper risus enim leo nunc mauris lacus tellus viverra posuere ',
                        answer: 'Answer eu in nunc sem ultrices duis scelerisque feugiat dictum egestas ',
                        score: 0,
                        lastReviewDate: 'Use some date thing please',
                        lastReviewEmail: 'example@example.com',
                        comment: '',
                    },
                ]
            },
        ];

        dispatch(questionsByUserSuccess(questions));
        // dispatch(questionsLoading());
        //
        // Http.get(``)
        //     .then(questions => {
        //         dispatch(questionsByUserSuccess(questions));
        //     })
        //     .then(() => dispatch(questionsStopLoading()))
        //     .catch((err) => {
        //         console.log(err);
        //         // dispatch(menuSetError(err));
        //     });
    };
}

export function getQuestionByQuestion() {
    return (dispatch) => {

        const questions = [
            {
                questionTitle:'Question',
                questionText:'questionText',
                countQuestion: 10,
                open: false, // добавлять на фронте
                user: [
                    {
                        userId: 55,
                        answer: 'Answer eu in nunc sem ultrices duis scelerisque feugiat dictum egestas ',
                        score: 0,
                        lastReviewDate: 'Use some date thing please',
                        lastReviewEmail: 'example@example.com',
                        comment: '',
                    },
                    {
                        userId: 56,
                        answer: 'Answer',
                        score: 0,
                        lastReviewDate: 'Use some date thing please',
                        lastReviewEmail: 'example@example.com',
                        comment: '',
                    },
                ]
            },
            {
                questionTitle:'Question',
                questionText:'questionText',
                countQuestion: 10,
                open: false, // добавлять на фронте
                user: [
                    {
                        userId: 55,
                        answer: 'Answer eu in nunc sem ultrices duis scelerisque feugiat dictum egestas ',
                        score: 0,
                        lastReviewDate: 'Use some date thing please',
                        lastReviewEmail: 'example@example.com',
                        comment: '',
                    },
                    {
                        userId: 56,
                        answer: 'Answer',
                        score: 0,
                        lastReviewDate: 'Use some date thing please',
                        lastReviewEmail: 'example@example.com',
                        comment: '',
                    },
                ]
            },
        ];

        dispatch(questionsByQuestionSuccess(questions));

        // dispatch(questionsLoading());

        // Http.get(``)
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
