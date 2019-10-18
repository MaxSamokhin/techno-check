import React from 'react';
import {connect} from 'react-redux';
import './result-home.page.less';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import {formatDate} from '../../service/get-date';
import {Link} from 'react-router-dom';
import {getSelectionHome} from '../selection-home/selection-home.action';

class ResultHomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getSelectionHome();
    }

    render() {
        const {selectionHome} = this.props;

        return (
            <div className='result-home'>
                <section className='result-home__table-wrapper'>
                    <Table className={'result-home__table'}>
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
                                    <TableRow key={selection.selectionId}>
                                        <TableCell>
                                            <Link to={`/admin/result/${selection.selectionId}`}>
                                                {selection.selectionTitle}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultHomePage);
