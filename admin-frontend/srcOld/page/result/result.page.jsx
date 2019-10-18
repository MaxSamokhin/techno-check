import React from 'react';
// import Table from '../../components/table/table.jsx';
import {connect} from 'react-redux';
import {
    getInquirers,
    getResultByInquirer,
    changeVisible
} from '../../actions/result.action.js';
import Collapsible from 'react-collapsible';

import './result.page.less';
import Table from '../../components/table/table.jsx';
import {Loader} from 'semantic-ui-react';

const ANY = 0;
const TEST = 1;
const CATEGORY = 2;

class ResultPage extends React.Component {
    componentDidMount() {
        this.props.getInquirers();
    }

    render() {
        const menu = this.getMenu();

        return (
            <div className={'result'}>
                <div className='result__menu'>
                    {menu}
                </div>
            </div>
        );
    }

    getMenu() {
        const {inquirers, isLoadingResultData,} = this.props;

        const [column, mask] = this.getColumn();
        const data = this.getData(mask);

        console.log('getMenu', column, null);

        return (
            inquirers.map(({inquirerId, inquirerTitle, isVisible}) => (
                <Collapsible
                    key={inquirerId}
                    trigger={<div className={'collapsible__text'}>{inquirerTitle}</div>}
                    classParentString='test__collapsible'
                    handleTriggerClick={this.clickExpandButton.bind(this, inquirerId)}
                    transitionTime={100}
                    open={isVisible}
                >
                    {
                        !isLoadingResultData ?
                            <div className='result__table'>
                                <Table
                                    column={column}
                                    data={data}
                                />
                            </div> :
                            <div className='result__loader'>
                                <Loader active inline='centered'/>
                            </div>
                    }
                </Collapsible>
            ))
        );
    }

    getData(mask) {
        const {inquirersResult} = this.props;

        if (inquirersResult.length === 0) {
            return null;
        }

        console.log(mask);
        let result = Array(inquirersResult.length).fill().map(() => []);

        console.log('getData', result);

        inquirersResult.forEach((elem, indexInquirer) => {
            result[indexInquirer].push(elem.user.email);
            result[indexInquirer].push(elem.inquirerScore);

            elem.inquirerTests.forEach((elemTests) => {
                result[indexInquirer].push(elemTests.testScore);

                elemTests.testCategories.forEach(elemCategories => {
                    result[indexInquirer].push(elemCategories.categoryScore);
                });

            });

        });

        return result;
    }

    getColumn() {
        const {inquirersResult} = this.props;

        if (inquirersResult.length === 0) {
            return [null];
        }

        let mask = [ANY, ANY];
        const tests = inquirersResult[0].inquirerTests;

        let testsHeader = tests.map(elem => {

            mask.push(TEST);
            let headerCategory = elem.testCategories.map(elem => {
                mask.push(CATEGORY);
                return `${elem.categoryTitle}`;
            });

            return [`${elem.testTitle}`, ...headerCategory];
        });

        console.log('testsHeader', testsHeader); // Array[0] ['Балл за тест 123123', 'Балл за категорию котегория 1']

        let headerTable = ['Пользователь', 'Cумма'];

        testsHeader.forEach(elem => {
            headerTable = headerTable.concat(elem);
        });

        console.log('headerTable', headerTable);

        return [
            headerTable,
            mask
        ];
    }

    clickExpandButton(inquirerId) {
        const {getResultByInquirer, changeVisible} = this.props;

        getResultByInquirer(inquirerId);
        changeVisible(inquirerId);
    }
}

function mapStateToProps(state) {
    return {
        inquirers: state.result.inquirers,
        inquirersResult: state.result.inquirersResult,
        isLoadingResultData: state.result.isLoadingResultData
    };
}

const mapDispatchToProps = (dispatch) => ({
    getInquirers: () => dispatch(getInquirers()),
    getResultByInquirer: (inquirerId) => dispatch(getResultByInquirer(inquirerId)),
    changeVisible: (inquirerId) => dispatch(changeVisible(inquirerId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
