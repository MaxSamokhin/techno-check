import React from 'react';
import InputFile from '../../../components/input-file/input-file.jsx';

import './answer-file.less';

export default class AnswerFile extends React.Component {
    render() {
        return (
            <div className='answer-file'>
                <form>
                    <InputFile/>
                </form>
            </div>
        );
    }
}
