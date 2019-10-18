import React from 'react';
import PropTypes from 'prop-types';

import './input.less';

export default class Input extends React.Component {
    render() {
        const {type, fieldName, handleChange, placeholder, value} = this.props;

        return (
            <input
                className={'input'}
                type={type}
                data-field-name={fieldName}
                onChange={handleChange}
                placeholder={placeholder}
                defaultValue={value}
                name={fieldName}
            />
        );
    }
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    fieldName: PropTypes.string,
    handleChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string
};
