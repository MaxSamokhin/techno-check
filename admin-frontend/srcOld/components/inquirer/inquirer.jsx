import React from 'react';
import PropTypes from 'prop-types';
// import MomentPropTypes from 'react-moment-proptypes';

import InquirerHeader from '../inquirer-header/inquirer-header.jsx';
import Test from '../test/test.jsx';
import Button from '../button/button.jsx';
import Collapsible from '../collapsible/collapsible.jsx';
import InputFile from '../input-file/input-file.jsx';

import './inquirer.less';
import {generateId} from '../../service/generate-id';
import { toast } from 'react-toastify';
import Popup from 'reactjs-popup';

export default class Inquirer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valueLeft: this.props.inquirerTitle,
            startDate: this.props.inquirerStartDate,
            endDate: this.props.inquirerEndDate,

            isChanged: false,
            isVisible: false,
        };

        this.clickAddTest = this.clickAddTest.bind(this);
        this.handleSaveInquirer = this.handleSaveInquirer.bind(this);
        this.onChangeHeaderInput = this.onChangeHeaderInput.bind(this);
        this.clickExpandButton = this.clickExpandButton.bind(this);
        this.clickDeleteInquirer = this.clickDeleteInquirer.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }

    render() {
        const {valueLeft, startDate, endDate, isVisible} = this.state;

        const testsBlock = this._getTests();
        const isDisabled = valueLeft === '' || startDate === null || endDate === null;

        return (
            <div className='course'>
                <header className='course__header'>

                    <InquirerHeader
                        valueLeft={valueLeft}
                        withPeriod={true}
                        startDate={startDate}
                        endDate={endDate}
                        handlerHeaderInput={this.onChangeHeaderInput}
                        onBlur={this.handleSaveInquirer}
                        handleDelete={this.clickDeleteInquirer}
                    />

                </header>

                <Collapsible classParentString='course__collapsible'
                             trigger={<div> {isDisabled ? 'Для продолжения введите данные опроса' : 'Подробности опроса'} </div>}
                             handleTriggerClick={this.clickExpandButton}
                             triggerDisabled={isDisabled}
                             transitionTime={100}
                             open={isVisible && !isDisabled}
                             >
                    <div className='course__tests'>
                        {testsBlock}
                    </div>

                    <footer className='course__footer'>
                        <div className='course__header-file'>
                            <div className='course__header-input'>
                                <Popup 
                                    trigger={<div><InputFile
                                        label='Отправить приглашения'
                                        onChange={this.fileChangedHandler}
                                        maxSymbols={'30'}/></div>}
                                    on={['hover']}
                                    closeOnDocumentClick
                                    position="right center"
                                    >
                                    <span>Файл с и-мейлами пользователей по одному на строку</span>
                                    </Popup>
                            </div>

                        </div>
                        <div className={'course__button'}>
                            <Button
                                text={'Добавить тест'}
                                style={'default'}
                                handleClick={this.clickAddTest}
                            />
                        </div>
                    </footer>
                </Collapsible>

            </div>
        );
    }

    fileChangedHandler(e) {
        const {inquirerId, handleDownloadUserFile} = this.props;
        const file = e.target.files[0];

        handleDownloadUserFile(inquirerId, file);
    }

    onChangeHeaderInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    clickExpandButton() {
        const {valueLeft, startDate, endDate} = this.state;

        if (valueLeft === '' || !startDate || !endDate) {
            toast.error('Введены не все данные опросника');
            this.setState({isVisible: false});
            return;
        }

        this.setState({
            isVisible: !this.state.isVisible
        });
    }

    clickDeleteInquirer() {
        const {inquirerId, handleDeleteInquirer} = this.props;
        handleDeleteInquirer(inquirerId);
    }

    handleSaveInquirer(e) {
        const {
            inquirerId,
            handleSaveInquirer,
            handleChangeInquirer
        } = this.props;

        const {
            valueLeft,
        } = this.state;
        const startDate = e.startDate || this.state.startDate; 
        const endDate = e.endDate || this.state.endDate;

        if (inquirerId.substr(0, 1) === '_') {
            handleSaveInquirer(inquirerId, valueLeft, startDate, endDate);
            return;
        }

        handleChangeInquirer(inquirerId, valueLeft, startDate, endDate);
    }

    clickAddTest() {
        const {handleAddTest, inquirerId} = this.props;

        this.setState({isVisible: true});

        handleAddTest({
            testId: `${generateId()}`,
            testTitle: '',
            // timeLimit: moment('00:10', 'HH:mm'),
            timeLimit: '01:00',
            categories: []
        }, inquirerId);
    }

    _getTests() {
        const {
            handleAddCategory,
            inquirerId,
            handleSaveTest,
            handleSaveCategory,
            handleChangeTest,
            handleChangeCategory,
            handleDeleteTest,
            handleDeleteCategory,
            handleDeleteQuestion
        } = this.props;

        return this.props.tests.map(({testId, testTitle, timeLimit, categories}) => {
                return <Test
                    key={testId + ''}
                    testTitle={testTitle}
                    limitTime={timeLimit}
                    categories={categories}
                    testId={testId}
                    inquirerId={inquirerId}
                    handleSaveTest={handleSaveTest}
                    handleChangeTest={handleChangeTest}
                    handleChangeCategory={handleChangeCategory}
                    handleAddCategory={handleAddCategory}
                    handleSaveCategory={handleSaveCategory}
                    handleDeleteTest={handleDeleteTest}
                    handleDeleteCategory={handleDeleteCategory}
                    handleDeleteQuestion={handleDeleteQuestion}
                />;
            }
        );
    }
}

Inquirer.propTypes = {
    inquirerTitle: PropTypes.string,
    inquirerStartDate: PropTypes.string,
    inquirerEndDate: PropTypes.string,
    tests: PropTypes.array,
    handleAddTest: PropTypes.func,
    handleChangeTest: PropTypes.func,
    inquirerId: PropTypes.any,
    handleAddCategory: PropTypes.func,
    handleSaveTest: PropTypes.func,
    handleSaveCategory: PropTypes.func,
    handleSaveInquirer: PropTypes.func,
    handleChangeInquirer: PropTypes.func,
    handleChangeCategory: PropTypes.func,
    handleDeleteInquirer: PropTypes.func,
    handleDeleteTest: PropTypes.func,
    handleDeleteCategory: PropTypes.func,
    handleDeleteQuestion: PropTypes.func,
    // handleSetUserFile: PropTypes.func,
    handleDownloadUserFile: PropTypes.func,
    inquirerFileUser: PropTypes.any
};
