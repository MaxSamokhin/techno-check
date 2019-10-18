import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
// import { checkUser } from '../../actions/user.action';

const PrivateRoute = ({component: Component, ...rest}) => {

    console.log('PrivateRoute', rest.userData, rest);

    return (
        <Route
            {...rest}
            render={props =>
                rest.userData ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={'/not-found'}
                    />
                )
            }
        />
    );
};

const mapStateToProps = state => {
    return {
        userData: state.user.userData,
    };
};

// const mapDispatchToProps = (dispatch) => ({
//     checkUser: () => dispatch(checkUser()),
// });

export default connect(mapStateToProps)(PrivateRoute);
