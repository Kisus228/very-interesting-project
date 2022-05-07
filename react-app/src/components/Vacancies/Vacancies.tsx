import React from 'react';
import classes from './Vacancies.less';
import Button from "../Common/FormControl/Button";
import cn from "classnames";
import {Close, Delete, Edit, Open} from "../Common/Icons/Icons";
import {useNavigate} from "react-router-dom";
import {VacancyType} from "../../types/types";

interface Props {
    vacancies: VacancyType[],
    openedVacancies: boolean
}

const Vacancies: React.FC<Props> = (props) => {
    const vacancies = props.vacancies.filter(vacancy => vacancy.is_open === props.openedVacancies);

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
                {/*{props.map(item => <VacanciesItem key={item.id} {...item}/>)}*/}
                {vacancies.map((item, index) => <VacanciesItem key={index} {...item}/>)}
            </ul>
        </div>
    );
};

const VacanciesItem: React.FC<VacancyType> = (props) => {
    const navigate = useNavigate();

    return (
        <li className={classes.VacanciesTableWrapper}>
            <div>{props.name}</div>
            <div>(???)</div>
            <div>{props.count - props.free} из {props.count}</div>
            <div>{props.is_open ? "Открыта" : "Закрыта"}</div>
            <div className={classes.VacanciesButtons}>
                {/*<Button type={"button"} size={"small"} to={`/vacancies/${props.id}`}>Страница вакансии</Button>*/}
                <Button type={"button"} size={"small"} to={`/vacancies/1`}>Страница вакансии</Button>
                {
                    props.is_open &&
                    <>
                        {/*<Edit onClick={() => navigate(`/vacancies/${props.id}/edit`)}/>*/}
                        <Edit onClick={() => navigate(`/vacancies/1/edit`)}/>
                        <Close onClick={() => console.log('Close')}/>
                    </>
                }
                {
                    !props.is_open &&
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