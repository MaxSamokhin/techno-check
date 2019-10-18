import React from 'react';

import Button from '../../components/button/button.jsx';
import Inquirer from '../../components/inquirer/inquirer.jsx';
import {connect} from 'react-redux';
import {generateId} from '../../service/generate-id';
import {
    getInquirer,
    addInquirer,
    addTest,
    addCategory,
    saveInquirer,
    saveTest,
    changeTest,
    saveCategory,
    changeInquirer,
    changeCategory,
    deleteInquirer,
    deleteTest,
    deleteCategory,
    deleteQuestion,
    downloadUserFile
} from '../../actions/inquirer.action';
import PropTypes from 'prop-types';
import './inquirer.page.less';
import moment from 'moment';


class InquirerPage extends React.Component {
    constructor(props) {
        super(props);

        this.handleAddInquirer = this.handleAddInquirer.bind(this);
    }

    componentDidMount() {
        this.props.getInquirer();
    }

    render() {
        const inquirersBlock = this._getCourse();

        return (
            <div className='container'>

                {inquirersBlock}

                <footer className='footer'>
                    <Button
                        text={'Добавить опрос'}
                        handleClick={this.handleAddInquirer}
                        style={'default'}
                    />
                </footer>
            </div>
        );
    }

    _getCourse() {
        const {
            addTest,
            addCategory,
            saveInquirer,
            saveTest,
            saveCategory,
            changeInquirer,
            changeTest,
            changeCategory,
            deleteInquirer,
            deleteTest,
            deleteCategory,
            deleteQuestion,
            downloadUserFile
        } = this.props;

        return this.props.inquirers.map(({inquirerId, inquirerFileUser, inquirerTitle, inquirerStartDate, inquirerEndDate, tests}) => {
                return (
                    <Inquirer
                        key={inquirerId}
                        inquirerTitle={inquirerTitle}
                        inquirerStartDate={inquirerStartDate}
                        inquirerEndDate={inquirerEndDate}
                        tests={tests}
                        handleAddTest={addTest}
                        inquirerId={inquirerId + ''}
                        handleAddCategory={addCategory}
                        handleSaveInquirer={saveInquirer}
                        handleChangeInquirer={changeInquirer}
                        handleSaveTest={saveTest}
                        handleChangeTest={changeTest}
                        handleSaveCategory={saveCategory}
                        handleChangeCategory={changeCategory}
                        handleDeleteInquirer={deleteInquirer}
                        handleDeleteTest={deleteTest}
                        handleDeleteCategory={deleteCategory}
                        handleDeleteQuestion={deleteQuestion}
                        handleDownloadUserFile={downloadUserFile}
                        inquirerFileUser={inquirerFileUser}
                    />
                );
            }
        );
    }

    handleAddInquirer() {
        this.props.addInquirer({
            inquirerId: `${generateId()}`,
            inquirerTitle: '',
            inquirerStartDate: moment().add(1, 'day'),
            inquirerEndDate: moment().add(1, 'week'),
            tests: []
        });
    }
}

function mapStateToProps(state) {
    return {
        inquirers: state.inquirer.inquirers,
        isLoading: state.inquirer.isLoading
    };
}

const mapDispatchToProps = (dispatch) => ({
    getInquirer: params => dispatch(getInquirer(params)),

    addInquirer: params => dispatch(addInquirer(params)),
    saveInquirer: (inquirerId, inquirerTitle, inquirerStartDate, inquirerEndDate) =>
        dispatch(saveInquirer(inquirerId, inquirerTitle, inquirerStartDate, inquirerEndDate)),
    changeInquirer: (inquirerId, inquirerTitle, inquirerStartDate, inquirerEndDate) =>
        dispatch(changeInquirer(inquirerId, inquirerTitle, inquirerStartDate, inquirerEndDate)),
    deleteInquirer: inquirerId =>
        dispatch(deleteInquirer(inquirerId)),

    addTest: (params, inquirerId) => dispatch(addTest(params, inquirerId)),
    saveTest: (inquirerId, testId, testTitle, testLimit) =>
        dispatch(saveTest(inquirerId, testId, testTitle, testLimit)),
    changeTest: (inquirerId, testId, testTitle, testLimit) =>
        dispatch(changeTest(inquirerId, testId, testTitle, testLimit)),
    deleteTest: (inquirerId, testId) => dispatch(deleteTest(inquirerId, testId)),

    addCategory: (params, inquirerId, testId) => dispatch(addCategory(params, inquirerId, testId)),
    saveCategory: (inquirerId, testId, categoryId, categoryTitle) =>
        dispatch(saveCategory(inquirerId, testId, categoryId, categoryTitle)),
    changeCategory: (inquirerId, testId, categoryId, categoryTitle) =>
        dispatch(changeCategory(inquirerId, testId, categoryId, categoryTitle)),
    deleteCategory: (inquirerId, categoryId, testId) => dispatch(deleteCategory(inquirerId, categoryId, testId)),

    deleteQuestion: (inquirerId, categoryId, testId, questionId) =>
        dispatch(deleteQuestion(inquirerId, categoryId, testId, questionId)),

    downloadUserFile: (inquirerId, file) => dispatch(downloadUserFile(inquirerId, file))
});


export default connect(mapStateToProps, mapDispatchToProps)(InquirerPage);

InquirerPage.propTypes = {
    addCategory: PropTypes.func,
    addTest: PropTypes.func,
    addInquirer: PropTypes.func,
    getInquirer: PropTypes.func,
    inquirers: PropTypes.array,
    isLoading: PropTypes.bool,
    saveInquirer: PropTypes.func,
    saveTest: PropTypes.func,
    saveCategory: PropTypes.func,
    changeInquirer: PropTypes.func,
    changeTest: PropTypes.func,
    changeCategory: PropTypes.func,
    deleteInquirer: PropTypes.func,
    deleteTest: PropTypes.func,
    deleteCategory: PropTypes.func,
    deleteQuestion: PropTypes.func,
    downloadUserFile: PropTypes.func
};
