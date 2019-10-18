import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {LOG_IN} from '../../constants/routes-map.constant';
import { connect } from 'react-redux';
import { checkUser } from '../../actions/login.action';

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
