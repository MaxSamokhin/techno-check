import React from 'react';
import PropTypes from 'prop-types';

import './checkbox.less';

export default class Checkbox extends React.Component {
    render() {
        const {checkboxValue, name ,isChecked, handleOnChange, label} = this.props;

        return (
            <div>
                <label className={'checkbox__wrapper'}>
                    <input
                        type='checkbox'
                        value={checkboxValue}
                        name={name}
                        checked={isChecked}
                        onChange={handleOnChange}/>

                    {this.props.label}

                </label>
            </div>
        );
    }
}

Checkbox.propTypes = {
    label: PropTypes.string,
    checkboxValue: PropTypes.string,
    name: PropTypes.string,
    isChecked: PropTypes.bool,
    handleOnChange: PropTypes.func
};
