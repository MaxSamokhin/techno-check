import React from 'react';
import './table-header.less';

const TableHeader = ({columns}) => {
    return (
        <thead>
        <tr className={'table__row'}>
            {columns.map((element, index) =>
                <th
                    className={'table__col'}
                    key={index}
                >
                    {element.label}
                </th>
            )}
        </tr>
        </thead>
    );
};

export default TableHeader;
