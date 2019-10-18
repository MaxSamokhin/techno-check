import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {LOG_IN} from '../../constant/routes-map.constant';
import {connect} from 'react-redux';
import {checkUser} from '../../page/login/login.action';

const PrivateRoute = ({component: Component, ...rest}) => {

    rest.checkUser();

    return (
        <Route
            {...rest}
            render={props =>
                rest.isSuperuser ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={LOG_IN}
                    />
                )
            }
        />
    );
};

const mapStateToProps = state => {
    return {
        isSuperuser: state.login.isSuperuser,
    };
};

const mapDispatchToProps = (dispatch) => ({
    checkUser: () => dispatch(checkUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
