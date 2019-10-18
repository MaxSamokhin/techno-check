import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';
import Button from '../button/button.jsx';

export default class LinkButton extends React.Component {
    render() {
        const {to} = this.props;

        return (
            <Link to={to}>
                <Button style='success' {...this.props} />
            </Link>
        );
    }
}

LinkButton.propTypes = {
    to: PropTypes.string.isRequired,
};
