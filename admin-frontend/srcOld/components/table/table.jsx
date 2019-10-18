import React from 'react';
import PropTypes from 'prop-types';

import {Table} from 'semantic-ui-react';


export default class TableCustom extends React.Component {
    render() {
        const {column, data} = this.props;

        console.log('TableCustom', column, data);

        if (!column || !data) {
            return <div className='table__not-found'>Нет данных</div>;
        }
        
        return (
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        {
                            column.map((elem, index) => (
                                <Table.HeaderCell key={index}>
                                    {elem}
                                </Table.HeaderCell>
                            ))
                        }
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        data.map((data, index) => (
                            <Table.Row key={index}>
                                {
                                    data.map(elem => (
                                        <Table.Cell>{elem}</Table.Cell>
                                    ))
                                }
                            </Table.Row>
                        ))
                    }
                </Table.Body>

            </Table>
        );
    }
}

Table.propTypes = {
    data: PropTypes.array,
    column: PropTypes.array
};
