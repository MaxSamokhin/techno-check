import React from 'react';
import PropTypes from 'prop-types';

import InquirerHeader from '../inquirer-header/inquirer-header.jsx';
import Card from '../card/card.jsx';
import Button from '../button/button.jsx';
import Collapsible from '../collapsible/collapsible.jsx';

import './test.less';
import {generateId} from '../../service/generate-id';
import {toast} from 'react-toastify';
import {isValidTest} from '../../service/validator';

export default class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valueLeft: this.props.testTitle,
            limitTime: this.props.limitTime,

            isVisible: false
        };

        this.clickAddCategory = this.clickAddCategory.bind(this);
        this.clickSaveTest = this.clickSaveTest.bind(this);
        this.onChangeHeaderInput = this.onChangeHeaderInput.bind(this);
        this.clickExpandButton = this.clickExpandButton.bind(this);
        this.clickDeleteTest = this.clickDeleteTest.bind(this);
    }

    render() {
        const {valueLeft, limitTime, isVisible} = this.state;
        const cardBlock = this._getCard();

        const isDisabled = valueLeft === '' || limitTime === null;
        return (
            <div className='test'>

                <div className='test__header'>

                    <InquirerHeader
                        titleLeft={'Tecт:'}
                        valueLeft={valueLeft}
                        withPerion={false}
                        limitTime={limitTime}
                        handlerHeaderInput={this.onChangeHeaderInput}
                        handleDelete={this.clickDeleteTest}
                        onBlur={this.clickSaveTest}
                    />

                </div>

                <Collapsible classParentString='test__collapsible'
                             trigger={<div> {isDisabled} {isDisabled ? 'Введите данные теста' : 'Категории теста'} </div>}
                             handleTriggerClick={this.clickExpandButton}
                             triggerDisabled={isDisabled}
                             transitionTime={100}
                             open={isVisible && !isDisabled}
                >

                    <div className='test__cards'>
                        {cardBlock}
                    </div>

                    <div className='test__button'>
                        <Button
                            text={'Добавить категорию'}
                            style={'default'}
                            handleClick={this.clickAddCategory}
                        />
                    </div>

                </Collapsible>

            </div>
        );
    }

    onChangeHeaderInput(e) {
        if (e.target !== undefined) {
            this.setState({
                [e.target.name]: e.target.value
            });
        } else {  // Hack for test header limitTime field.
            this.setState({
                limitTime: e.format('HH:mm:ss')
            });
        }
    }

    clickSaveTest() {
        const {valueLeft, limitTime} = this.state;
        let {
            testId,
            inquirerId,
            handleSaveTest,
            handleChangeTest
        } = this.props;

        if (!isValidTest(valueLeft, limitTime)) {
            return;
        }

        testId = testId ? testId + '' : generateId();

        console.log('clickSaveTest clickSaveTest', testId);

        if (testId.substr(0, 1) !== '_') {
            console.log('clickSaveTest clickSaveTest');
            handleChangeTest(inquirerId, testId, valueLeft, limitTime);
            return;
        }
        handleSaveTest(inquirerId, testId, valueLeft, limitTime);
    }

    clickAddCategory() {
        const {handleAddCategory, testId, inquirerId} = this.props;

        handleAddCategory({
            categoryId: `${generateId()}`,
            categoryTitle: '',
            questions: []
        }, inquirerId, testId);
    }

    clickDeleteTest() {
        const {handleDeleteTest, testId, inquirerId} = this.props;
        handleDeleteTest(inquirerId, testId);
    }

    clickExpandButton() {
        const {valueLeft, limitTime} = this.state;

        console.log('clickExpandButton', valueLeft, limitTime);

        if (!isValidTest(valueLeft, limitTime)) {
            toast.error('Введены не все данные теста');
            this.setState({isVisible: false});
            return;
        }

        this.setState({
            isVisible: !this.state.isVisible
        });
    }

    _getCard() {
        const {
            inquirerId,
            testId,
            handleSaveCategory,
            handleChangeCategory,
            handleDeleteCategory,
            handleDeleteQuestion
        } = this.props;

        return this.props.categories.map(({categoryId, categoryTitle, questions}) => (
            <Card
                key={categoryId + ''}
                categoryTitle={categoryTitle}
                questions={questions || []}
                handleSaveCategory={handleSaveCategory}
                handleChangeCategory={handleChangeCategory}
                testId={testId}
                inquirerId={inquirerId}
                categoryId={categoryId}
                handleDeleteCategory={handleDeleteCategory}
                handleDeleteQuestion={handleDeleteQuestion}
            />
        ));
    }
}

Test.propTypes = {
    testTitle: PropTypes.string,
    limitTime: PropTypes.string,
    categories: PropTypes.array,
    handleAddCategory: PropTypes.func,
    handleSaveTest: PropTypes.func,
    testId: PropTypes.any,
    inquirerId: PropTypes.any,
    handleSaveCategory: PropTypes.func,
    handleChangeTest: PropTypes.func,
    handleChangeCategory: PropTypes.func,
    handleDeleteTest: PropTypes.func,
    handleDeleteCategory: PropTypes.func,
    handleDeleteQuestion: PropTypes.func
};


