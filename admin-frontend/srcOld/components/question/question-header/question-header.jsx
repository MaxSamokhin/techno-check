import React from 'react';
import PropTypes from 'prop-types';

// import Input from '../../input/input.jsx';
import Select from '../../select/select.jsx';
import './question-header.less';

import {
    MULTIPLE_TEST,
    // VIDEO,
    TEXT,
    TEST
} from '../../../constants/questyon.type';
import {
    changeTitle,
    changeType,
    changeCheckbox
} from '../../../actions/question.action';
import {connect} from 'react-redux';
import Checkbox from '../../../components/checkbox/checkbox.jsx';
import ReactMde from 'react-mde';
import Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import 'draft-js/dist/Draft.css';

class QuestionHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            // value: 'You shouldn\'t see me'
        };

        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
        });

        this.handleValueChange = this.handleValueChange.bind(this);
    }

    componentDidMount() {
        console.log('cDM@', this.props);
    }


    handleValueChange = (value) => {
        this.setState({ value });
    };


    render() {
        const {
            questionTitle,
            questionType,
            changeTitle,
            changeType,
            checkManual,
            changeCheckbox
        } = this.props;

        console.log('QuestionHeader QuestionHeader', questionTitle);
        console.log('!!!', this.props.questionTitle);
        return (
            <header className='question-header'>
                <div className='question-header__input'>
                    <span className='question-header__title-label'>Введите вопрос:</span>
                    <ReactMde
                        value={'value is: ' + this.props.questionTitle}
                        onChange={(e) => {this.handleValueChange(e); changeTitle(e);}}
                        generateMarkdownPreview={markdown =>
                            Promise.resolve(this.converter.makeHtml(markdown))
                        }
                    />
                </div>

                <div className='question-header__select'>
                    <Select
                        options={[
                            {
                                label: 'Вопрос с одним ответом',
                                value: TEST
                            },
                            {
                                label: 'Вопрос с несколькими ответами',
                                value: MULTIPLE_TEST
                            },
                            {
                                label: 'Текстовый вопрос',
                                value: TEXT
                            },
                            // {
                            //     label: 'Видео вопрос',
                            //     value: VIDEO
                            // }
                        ]}
                        handleSelect={changeType}
                        typeSelect={questionType}
                    />
                </div>

                {
                    questionType === TEXT &&
                    <Checkbox
                        label={'Проверить вопрос руками'}
                        checkboxValue={'checkManual'}
                        isChecked={checkManual}
                        handleOnChange={changeCheckbox}
                    />
                }
            </header>
        );
    }
}
//                    <Input
//                        type={'text'}
//                        value={questionTitle + ''}
//                        handleChange={changeTitle}
//                        placeholder={'Введите вопрос'}
//                    />

QuestionHeader.propTypes = {
    questionTitle: PropTypes.string,
    questionType: PropTypes.string,
    changeTitle: PropTypes.func,
    changeType: PropTypes.func,
    checkManual: PropTypes.bool,
    changeCheckbox: PropTypes.func
};

function mapStateToProps(state) {
    return {
        // questionTitle: state.question.questionTitle,
        // value: state.question.questionTitle,
        questionType: state.question.questionType,
        checkManual: state.question.checkManual
    };
}

const mapDispatchToProps = (dispatch) => ({
    changeTitle: e => dispatch(changeTitle(e)),
    changeType: e => dispatch(changeType(e)),
    changeCheckbox: e => dispatch(changeCheckbox(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionHeader);
