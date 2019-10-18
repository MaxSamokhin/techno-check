import {LOG_IN_USER_SUCCESS, LOG_OUT} from './login.constant.js';

import Http from '../../service/http';
import {toast} from 'react-toastify';

const logout = () => ({
    type: LOG_OUT
});

const loginSetInfoUser = (res) => ({
    type: LOG_IN_USER_SUCCESS,
    payload: {
        email: res.email,
        isSuperuser: res.is_superuser,
        isExpert: res.is_expert
    }
});

function getUserInfo(dispatch) {

    console.log('getUserInfo');

    Http.get('api/auth/me')
      .then((res) => {

          console.log('api/auth/me', res);
          console.log(res);

          if (res.status === 'error') {
              // if (res.hasOwnProperty('selectionTitle')) {
              //     dispatch(setErrorSelection(res.selectionTitle[0]));
              // }
              //
              // if (res.hasOwnProperty('selectionStartDate')) {
              //     dispatch(setErrorSelection(res.selectionStartDate[0]));
              // }
              console.log('error getUserInfo', res);
              return;
          }

          dispatch(loginSetInfoUser(res));
      })
      .catch((error) => {

          console.log('error');
          console.log(error);

      });

    // }, 500);
}

export function checkUser() {
    return (dispatch) => getUserInfo(dispatch);
}

export function logIn({email, password}) {
    return (dispatch) => {

        Http.post('api/auth/login', {email, password})
          .then(res => {

              console.log('response');
              console.log(res);

              if (res.status === 'error') {

                  toast.error(res.message);

                  console.log('error logIn', res);
                  return;
              }

              getUserInfo(dispatch);

          })
          .catch((error) => {
              console.log(error);
          });

    };
}

export function logOut() {
    return (dispatch) => {
        Http.post('api/auth/logout')
          .then((res) => {
              if (res.status === 'success') {
                  dispatch(logout());
              }
          })
          .catch((error) => {
              console.log(error);
          });
    };
}
