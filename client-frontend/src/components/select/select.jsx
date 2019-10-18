import React from 'react';
import PropTypes from 'prop-types';
import './select.less';

export default class Select extends React.Component {
    // constructor(props) {
    //     super(props);

        // this.state = {
        //     selectValue: this.
        // };

        // this._onChange = this._onChange.bind(this);
    // }

    render() {
        const {options, typeSelect, handleSelect} = this.props;
        // const {selectValue} = this.props.typeSelect;

        const optionsList = this._getOptions(options);

        return (
            <div className='select'>
                <select
                    onChange={handleSelect}
                    value={typeSelect}
                    className={'select__element'}
                >

                    {optionsList}

                </select>
            </div>
        );
    }

    _getOptions(options) {
        return options.map((item, index) => {
            return (
                <option
                    value={item.value}
                    key={index}
                    className={'select__item'}
                >
                    {item.label}
                </option>
            );
        });
    }

    // _onChange(event) {
    //     this.setState({selectValue: event.target.value});
    //     this.props.handleSelect(event.target.value);
    // }
}

Select.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    handleSelect: PropTypes.func,
    typeSelect: PropTypes.string.isRequired
};
