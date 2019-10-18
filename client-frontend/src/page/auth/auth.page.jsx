import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {getUserInfo} from './../../actions/user.action';

class Auth extends React.Component {
    componentDidMount() {
        const {token} = this.props.match.params;
        console.log('token', token);
        this.props.getUserInfo(token);
    }

    render() {
        const {userData} = this.props;

        if (userData) {
            return <Redirect to={'/'}/>;
        }

        console.log(userData);

        return (<div className='auth'>auth</div>);
    }
}

function mapStateToProps(state) {
    return {
        userData: state.user.userData,
    };
}

const mapDispatchToProps = dispatch => ({
    getUserInfo: (token) => dispatch(getUserInfo(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

Auth.propTypes = {
    getUserInfo: PropTypes.func,
    userData: PropTypes.any
};
