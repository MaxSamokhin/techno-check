import React from 'react';
import './inquirer-header.less';
import Input from '../input/input.jsx';
import Button from '../button/button.jsx';
import PropTypes from 'prop-types';
// import MomentPropTypes from 'react-moment-proptypes';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
moment.locale('ru');

export default class InquirerHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedInput: null,
            startDate: moment(this.props.startDate),
            endDate: moment(this.props.endDate),
            isChanged: false,
        };
    }

    render() {
        const {
            withPeriod,
            handlerHeaderInput,
            valueLeft,
            onBlur,
            handleDelete
        } = this.props;

        const timeBlock = this._getTimeBlock(withPeriod);

        return (
            <div className='course-header'>

                <div className='course-header__title'>
                    <div className='course-header__input _with-pen'>
                        <Input
                            type={'text'}
                            className={'_transparent'}
                            placeholder={withPeriod ? 'Название опроса' : 'Название теста'}
                            value={valueLeft}
                            handleChange={(e) => {handlerHeaderInput(e); this.setState({isChanged: true});}}
                            fieldName={'valueLeft'}
                            onBlur={(e) => {if (this.state.isChanged) {onBlur(e); this.setState({isChanged: false});} }}
                        />
                    </div>
                </div>

                <div className='course-header__right-block'>
                    {timeBlock}

                    <div className='course-header__delete-button'>
                        <Button
                            text={'×'}
                            style={'delete'}
                            handleClick={handleDelete}
                        />
                    </div>
                </div>
            </div>

        );
    }

    _getTimeBlock(withPeriod) {

        const {limitTime, handlerHeaderInput, onBlur} = this.props;

        if (withPeriod) {
            return (
                <div className='course-header__time'>

                    <span className='course-header__text'>Период:&nbsp;</span>

                    <DateRangePicker
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        startDateId="your_unique_start_date_id"
                        endDateId="your_unique_end_date_id"
                        onDatesChange={({ startDate, endDate }) => this.setState({startDate, endDate, isChanged: true})}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={focusedInput => this.setState({ focusedInput })}
                        hideKeyboardShortcutsPanel={true}
                        onClose={(e) => {if (this.state.isChanged) {onBlur(e); this.setState({isChanged: false});} else ;}}
                    />
                        {/*onFocusChange={focusedInput => this.setState({ focusedInput })}*/}

                    {/*<Input
                        className={'course-header__input'}
                        type={'datetime-local'}
                        value={startDate}
                        handleChange={handlerHeaderInput}
                        fieldName={'startDate'}
                        onBlur={onBlur}
                    />

                    <span className='course-header__text'>&nbsp;до&nbsp;</span>

                    <Input
                        className={'course-header__input'}
                        type={'datetime-local'}
                        value={endDate}
                        handleChange={handlerHeaderInput}
                        fieldName={'endDate'}
                        onBlur={onBlur}
                    />*/}

                </div>
            );
        }

        return (
            <div className='course-header__time'>
                <span className='course-header__text'>Лимит времени:&nbsp;</span>

                <TimePicker
                    prefixCls='course-header__time-picker rc-time-picker'
                    value={moment(limitTime, 'HH:mm:ss')}
                    showSecond={false}
                    onChange={(e) => {handlerHeaderInput(e); this.setState({isChanged: true});}}
                    onClose={(e) => {if (this.state.isChanged) {onBlur(e); this.setState({isChanged: false});} else ;}}
                />
            </div>
        );
    }
}
// <Input
   // type={'time'}
    // value={limitTime}
    // handleChange={(e) => {handlerHeaderInput(e); this.setState({isChanged: true});}}
    // fieldName={'limitTime'}
    // onBlur={(e) => {if (this.state.isChanged) {onBlur(e); this.setState({isChanged: false});} else ;}}
// />

InquirerHeader.propTypes = {
    titleLeft: PropTypes.any,
    valueLeft: PropTypes.any,
    withPeriod: PropTypes.bool,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    limitTime: PropTypes.string,
    handlerHeaderInput: PropTypes.func,
    handleDelete: PropTypes.func,
    onBlur: PropTypes.func
};
