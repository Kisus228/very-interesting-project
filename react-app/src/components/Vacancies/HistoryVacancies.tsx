import React, {useState} from 'react';
import classes from './Vacancies.less';
import Button from "../Common/FormControl/Button";
import {Delete, Open} from "../Common/Icons/Icons";

interface Props {
    name: string,
    count: number,
    find: number,
    total: number,
    status: string,
}

const HistoryVacancies = () => {
    const [state] = useState<Props[]>([
        {
            name: "Верстальщик для сайтов",
            count: 1,
            find: 0,
            total: 2,
            status: "Закрыта",
        },
        {
            name: "SEO",
            count: 6,
            find: 3,
            total: 3,
            status: "Закрыта",
        },
        {
            name: "Аналитик",
            count: 1,
            find: 1,
            total: 3,
            status: "Закрыта",
        },
    ])

    return (
        <ul>
            {state.map(item => <VacanciesItem key={item.name} {...item}/>)}
        </ul>
    );
};

const VacanciesItem: React.FC<Props> = (props) => {
    return (
        <li className={classes.VacanciesTableWrapper}>
            <div>{props.name}</div>
            <div>{props.count}</div>
            <div>{props.find} из {props.total}</div>
            <div>{props.status}</div>
            <div className={classes.VacanciesButtons}>
                <Button size={"small"}>Страница вакансии</Button>
                <Open/>
                <Delete/>
            </div>
        </li>
    );
}

export default HistoryVacancies;