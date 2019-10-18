import React from 'react';
import {connect} from 'react-redux';
import './review-home.page.less';
import {getReviewSelection} from './review-home.action';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import {Link} from 'react-router-dom';
import {formatDate} from '../../service/get-date';

class ReviewHomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listForReviewHome: null
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.listForReviewHome !== prevProps.listForReviewHome) {

            const listForReviewHome = this.props.listForReviewHome;

            this.setState((state) => {
                return {
                    ...state,
                    listForReviewHome: listForReviewHome
                };
            });
        }
    }

    componentDidMount() {
        this.props.getReviewSelection();
    }

    render() {
        const {listForReviewHome} = this.state;

        console.log('listForReviewHome');
        console.log(listForReviewHome);

        return (
            <div className='result'>
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
                                !!listForReviewHome && listForReviewHome.map(selection => (
                                    <TableRow key={selection.selectionId}>
                                        <TableCell>
                                            <Link to={`/admin/review/${selection.selectionId}`}>
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
        listForReviewHome: state.reviewHome.listForReviewHome,
    };
}

const mapDispatchToProps = (dispatch) => ({
    getReviewSelection: () => dispatch(getReviewSelection()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewHomePage);
