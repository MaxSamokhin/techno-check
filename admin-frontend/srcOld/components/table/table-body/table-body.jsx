import React from 'react';
import './table-body.less';

const TableBody = ({data}) => {
    return (
        <tbody>
        {data.map((element, index) =>
            <tr key={index} className='table-body__row'>
                {element.map((item, i) =>
                    <td key={i}>{item}</td>
                )}
            </tr>
        )}
        </tbody>
    );
};

export default TableBody;
