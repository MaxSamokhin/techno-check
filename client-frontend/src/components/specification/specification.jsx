import React from 'react';
import './specification.less';


export default class Specification extends React.Component {
    render() {
        const {dateStart, dateEnd, title, limitTime} = this.props;

        return (
            <section className='specification'>
                <div className='specification__title'>
                    {title}
                </div>
                    {/*<li className={'specification__item'}> Дата начала: {this.formatDate(dateStart[0])}, {dateStart[1]}</li>}*/}
                    {/* {dateStart ? `Опросник закроется: ${this.formatDate(dateEnd[0])}, ${dateEnd[1]}` : ''} */}
                <ul className={'specification__menu'}>
                    {dateStart &&
                    <li className={'specification__item'}> Дата начала: {this.formatDate(dateStart[0])}</li>}
                    <li className={'specification__item'}>
                        {dateStart ? `Дата закрытия: ${this.formatDate(dateEnd[0])}` : ''}
                    </li>
                    <li className={'specification__item'}>
                        {limitTime ? `Лимит времени: ${limitTime}` : ''}
                    </li>
                    {/*<li className={'specification__item'}>Жульничать нельзя</li>*/}
                </ul>
            </section>
        );
    }

    formatDate(date) {

        date = new Date(date);

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }
}
