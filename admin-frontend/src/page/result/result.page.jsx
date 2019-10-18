import React from 'react';
import {connect} from 'react-redux';
import './result.page.less';
import {getResultBySelection} from './result.action';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

class ResultPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            result: null
        };
    }

    componentDidMount() {
        const {getResultBySelection} = this.props;
        const {selectionId} = this.props.match.params;

        console.log('selectionId componentDidMount');
        console.log(selectionId);

        getResultBySelection(selectionId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.result !== prevProps.result ||
            (this.props.result && this.props.result.results !== this.props.result.results)
        ) {
            const {result} = this.props;

            this.setState((state) => {
                return {
                    ...state,
                    result
                };
            });
        }
    }

    render() {
        const {result} = this.state;

        console.log('result');
        console.log(result);

        return (
            <div className='result'>
                <section className='result-home__table-wrapper'>
                    <Table className={'result-home__table'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Пользователь</TableCell>
                                {!!result && !!result.headers &&
                                <TableCell>{result.headers.selectionTitle}</TableCell>}
                                {
                                    !!result && !!result.headers && !!result.headers.selectionTests && result.headers.selectionTests.map(test => {
                                        let testCategories = [
                                            <TableCell>{test.testTitle}</TableCell>,
                                            ...test.testCategories.map(categories => {
                                            return <TableCell>{categories.categoryTitle}</TableCell>;
                                        })];

                                        return testCategories.map(elem => elem);
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                !!result && result.results.map((selection, index) => {

                                    let resultCells = [
                                        <TableCell>{selection.user.email}</TableCell>,
                                        <TableCell>{selection.selectionScore}</TableCell>
                                    ];

                                    let tests = selection.selectionTests.map(test => {
                                        let testResult = [<TableCell>{test.testScore}</TableCell>];

                                        let categoryResult = test.testCategories.map(category => {
                                           return [<TableCell>{category.categoryScore}</TableCell>];
                                        });

                                        return [...testResult, ...categoryResult];
                                    });

                                    resultCells = [...resultCells, ...tests];

                                    return <TableRow key={index}>
                                            {resultCells}
                                    </TableRow>;
                                })
                            }
                        </TableBody>
                    </Table>
                </section>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectionHome: state.selectionHome.selectionHome,
        result: state.result.result
    };
}

const mapDispatchToProps = (dispatch) => ({
    getResultBySelection: (selectionId) => {
        dispatch(getResultBySelection(selectionId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
