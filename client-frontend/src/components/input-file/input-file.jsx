import React from 'react';
import './input-file.less';

export default class InputFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: 'Выберите файл',
            selectedFile: null
        };

        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }

    render() {
        var label = this.state.label;
        label = (label.length > 25) ? (label.substr(0, 22) + '...') : label;
        return (
            <div className='input-file'>
                <input id='file' className='input-file__input' type='file' onChange={this.fileChangedHandler}/>
                <label for='file' className={'input-file__label' + (this.state.selectedFile ? ' input-file__label__filled' : '')}> {label} </label>
            </div>
        );
    }

    fileChangedHandler(event) {
        this.setState({label: event.target.value.split('\\').pop()});
        this.setState({selectedFile: event.target.files[0]});
    }
}
