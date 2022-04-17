import React, {useState} from 'react';
import classes from './Vacancies.less';
import Button from "../Common/FormControl/Button";
import {Close, Edit} from "../Common/Icons/Icons";

interface Props {
    name: string,
    count: number,
    find: number,
    total: number,
    status: string,
}

const OpenedVacancies = () => {
    const [state] = useState<Props[]>([
        {
            name: "Back-end разработчик",
            count: 3,
            find: 1,
            total: 2,
            status: "Открыта",
        },
        {
            name: "Front-end разработчик",
            count: 6,
            find: 0,
            total: 2,
            status: "Открыта",
        },
        {
            name: "Аналитик",
            count: 1,
            find: 0,
            total: 2,
            status: "Открыта",
        },
        {
            name: "Дизайнер",
            count: 14,
            find: 1,
            total: 3,
            status: "Открыта",
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
                <Edit/>
                <Close/>
            </div>
        </li>
    );
}

export default OpenedVacancies;