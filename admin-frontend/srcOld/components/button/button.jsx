import React from 'react';
import PropTypes from 'prop-types';
import './button.less';
import Popup from 'reactjs-popup';


export default class Button extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    openPopup() {
        this.setState({ open: true });
    }
 
    closePopup() {
        this.setState({ open: false });
    }

    render() {
        let {text, handleClick,isDisabled, size, style, type} = this.props;

        const sizeStyle = this._getSize(size);
        const typeStyle = this._getStyle(style);
        const className = `button ${sizeStyle} ${typeStyle} ${this.state.open ? 'modal-open' : ''}`;

        if (typeStyle === '_delete') {
            return (
                <Popup
                modal
                open={this.state.open}
                trigger={
                    <div>
                        <button
                            className={className}
                            type={type ? type : 'text'}
                            >
                            <span className='button__text'>{text}</span>
                        </button>
                    </div>
                }
                onOpen={this.openPopup}
                position='top center'
                lockScroll
                contentStyle={{width: '30%', 'borderRadius': '5px'}}
                >
                    <div className='button-delete'>
                        <span className='button-delete__text'>Вы уверены, что хотите удалить?</span>
                        <div className='button-delete__buttons'>
                            <Button
                                text={'Нет'}
                                style={'success'}
                                handleClick={this.closePopup}
                                />
                            <Button
                                text={'Да'}
                                style={'danger'}
                                handleClick={handleClick}
                                />
                        </div>
                    </div>
                </Popup>
            );
        }

        return (
            <button
                className={className}
                onClick={handleClick}
                disabled={isDisabled}
                type={type ? type : 'text'}
            >
                <span className='button__text'>{text}</span>
            </button>
        );
    }

    _getSize(size) {
        switch (size) {
            case 'small':
                return '_small';
            case 'medium':
                return '_medium';
            case 'large':
                return '_large';
            default:
                return '_medium';
        }
    }

    _getStyle(style) {
        switch (style) {
            case 'default':
                return '_default';
            case 'danger':
                return '_danger';
            case 'success':
                return '_success';
            case 'link':
                return '_link';                
            case 'expand':
                return '_expand';
            case 'active':
                return '_active';
            case 'disabled' :
                return '_disabled';
            case 'delete' :
                return '_delete';
            default:
                return '_default';
        }
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    isDisabled: PropTypes.bool,
    size: PropTypes.string,
    style: PropTypes.string,
    type: PropTypes.string
};

