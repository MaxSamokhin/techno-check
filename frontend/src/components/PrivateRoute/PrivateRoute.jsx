import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import { checkUser } from "../../redux/login/login.action";

const PrivateRoute = ({component: Component, ...rest}) => {

  rest.checkUser();

  return (
    <Route
      {...rest}
      render={props =>
        rest.isSuperuser || rest.isExpert ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={'/login'}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    isSuperuser: state.login.isSuperuser,
    isExpert: state.login.isExpert
  };
};

const mapDispatchToProps = (dispatch) => ({
  checkUser: () => dispatch(checkUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
