import React from 'react';
import {connect} from 'react-redux';
import {getSelectionHome} from './selection-home.action';
import './selection-home.page.less';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {formatDate} from '../../service/get-date';
import {Link, Redirect} from 'react-router-dom';
import {SELECTION} from '../../constant/routes-map.constant';
import {clearMenuData} from '../../components/menu/menu.action';
import {clearTestsForSelection} from '../selection/selection.action';

class SelectionHomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToAddSelection: false
        };
    }

    componentDidMount() {
        this.props.getSelectionHome();
    }

    render() {
        const {selectionHome} = this.props;
        const {redirectToAddSelection} = this.state;

        if (redirectToAddSelection) {
            return <Redirect push to={SELECTION}/>;
        }

        return (
            <div className='selection-home'>
                <Fab color='primary'
                     aria-label='Add'
                     onClick={this.handleClickAdd}
                     className={'selection-home__icon'}>
                    <AddIcon/>
                </Fab>
                <section className='selection-home__table-wrapper'>
                    <Table className={'selection-home__table'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Набор</TableCell>
                                <TableCell align='right'>Дата начала</TableCell>
                                <TableCell align='right'>Дата конца</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                !!selectionHome && selectionHome.map(selection => (
                                    <TableRow
                                        key={selection.selectionId}
                                        selected={selection.selectionStatus === 'ENDED'}
                                        >
                                        <TableCell>
                                            <Link to={`admin/selection/${selection.selectionId}`}>
                                                {`${selection.selectionTitle}${selection.selectionStatus === 'ENDED' ? ' (завершён)' : ''}`}
                                            </Link>
                                        </TableCell>
                                        <TableCell
                                            align='right'>{formatDate(new Date(selection.selectionStartDate))}</TableCell>
                                        <TableCell
                                            align='right'>{formatDate(new Date(selection.selectionEndDate))}</TableCell>
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
        this.props.clearMenuData();
        this.props.clearTestsForSelection();
        this.setState({redirectToAddSelection: true});
    }
}

function mapStateToProps(state) {
    return {
        selectionHome: state.selectionHome.selectionHome,
    };
}

const mapDispatchToProps = (dispatch) => ({
    getSelectionHome: () => {
        dispatch(getSelectionHome());
    },
    clearMenuData: () => dispatch(clearMenuData()),
    clearTestsForSelection: () => dispatch(clearTestsForSelection())
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionHomePage);
