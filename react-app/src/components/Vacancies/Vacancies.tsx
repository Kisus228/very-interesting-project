import React from 'react';
import classes from './Vacancies.less';
import Button from "../Common/FormControl/Button";
import cn from "classnames";
import {Close, Delete, Edit, Open} from "../Common/Icons/Icons";
import {useNavigate} from "react-router-dom";

interface Props {
    name: string,
    id: number,
    count: number,
    find: number,
    total: number,
    status: string,
}

const Vacancies: React.FC<{ state: Props[] }> = (props) => {
    return (
            <div className={classes.Vacancies}>
                <div className={cn(classes.VacanciesWrapper, classes.VacanciesTableHeader,
                    classes.VacanciesTableWrapper)}>
                    <div>Название</div>
                    <div>Кол-во откликов</div>
                    <div>Найдено</div>
                    <div>Статус</div>
                </div>
                <ul>
                    {props.state.map(item => <VacanciesItem key={item.id} {...item}/>)}
                </ul>
            </div>
    );
};

const VacanciesItem: React.FC<Props> = (props) => {
    const navigate = useNavigate();

    return (
        <li className={classes.VacanciesTableWrapper}>
            <div>{props.name}</div>
            <div>{props.count}</div>
            <div>{props.find} из {props.total}</div>
            <div>{props.status}</div>
            <div className={classes.VacanciesButtons}>
                <Button type={"button"} size={"small"} to={`/vacancies/${props.id}`}>Страница вакансии</Button>
                {
                    props.status === "Открыта" &&
                    <>
                        <Edit onClick={() => navigate(`/vacancies/${props.id}/edit`)}/>
                        <Close onClick={() => console.log('Close')}/>
                    </>
                }
                {
                    props.status === "Закрыта" &&
                    <>
                        <Open onClick={() => console.log('Open')}/>
                        <Delete onClick={() => console.log('Delete')}/>
                    </>
                }
            </div>
        </li>
    );
}

export default Vacancies;