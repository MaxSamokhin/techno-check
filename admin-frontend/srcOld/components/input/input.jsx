import React from 'react';
import PropTypes from 'prop-types';

import './input.less';

export default class Input extends React.Component {
    render() {
        const {type, fieldName, handleChange, onBlur, placeholder, value} = this.props;

        return (
            <div className='input'>
                <div className={'input__input-div ' + this.props.className}>
                    <input
                        className={'input__input ' + this.props.className}
                        type={type}
                        data-field-name={fieldName}
                        onBlur={onBlur}
                        onChange={handleChange}
                        placeholder={placeholder}
                        value={value}
                        name={fieldName}
                    />
                </div>
            </div>
        );
    }
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    fieldName: PropTypes.string,
    handleChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.any
};
