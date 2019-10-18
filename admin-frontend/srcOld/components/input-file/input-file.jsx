import React from 'react';
import './input-file.less';

export default class InputFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label || 'Выберите файл',
            selectedFile: null,
            onChange: this.props.onChange,
            maxSymbols: this.props.maxSymbols || 25
        };

        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }

    render() {
        let label = this.state.label;
        const maxSymbols = this.state.maxSymbols;
        label = (label.length > maxSymbols) ? (label.substr(0, maxSymbols - 3) + '...') : label;
        return (
            <div className='input-file'>
                <label className={'input-file__label' + (this.state.selectedFile ? ' input-file__label__filled' : '')}> 
                    <input className='input-file__input' type='file' onChange={this.fileChangedHandler}/>
                    {label}
                </label>
            </div>
        );
    }

    fileChangedHandler(event) {
        this.setState({label: event.target.value.split('\\').pop()});
        this.setState({selectedFile: event.target.files[0]});
        this.state.onChange(event);
    }
}
