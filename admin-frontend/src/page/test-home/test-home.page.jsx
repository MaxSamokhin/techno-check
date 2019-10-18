import React from 'react';
import {connect} from 'react-redux';
import {getTestHome} from './test-home.action';
import './test-home.page.less';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {Link, Redirect} from 'react-router-dom';
import {TEST} from '../../constant/routes-map.constant';

class TestHomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToAddTest: false
        };
    }

    componentDidMount() {
        this.props.getTestHome();
    }

    render() {
        const {testsHome} = this.props;
        const {redirectToAddTest} = this.state;

        if (redirectToAddTest) {
            return <Redirect push to={TEST}/>;
        }

        return (
            <div className='test-home'>
                <Fab color='primary'
                     aria-label='Add'
                     onClick={this.handleClickAdd}
                     className={'test-home__icon'}>
                    <AddIcon/>
                </Fab>
                <section className='test-home__table-wrapper'>
                    <Table className={'test-home__table'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Тест</TableCell>
                                <TableCell align='right'>Лимит времени</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                !!testsHome && testsHome.map(test => (
                                    <TableRow key={test.testId}>
                                        <TableCell>
                                            <Link to={`../admin/test/${test.testId}`}>
                                                {test.testTitle}
                                            </Link>
                                        </TableCell>
                                        <TableCell align='right'>
                                            {test.timeLimit}
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </section>
            </div>
        );
    }

    handleClickAdd = () => {
        this.setState({redirectToAddTest: true});
    }
}

function mapStateToProps(state) {
    return {
        testsHome: state.testHome.testsHome,
    };
}

const mapDispatchToProps = (dispatch) => ({
    getTestHome: () => {
        dispatch(getTestHome());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TestHomePage);
