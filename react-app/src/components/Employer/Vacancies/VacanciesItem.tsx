import React from 'react';
import classes from './Vacancies.less';
import Button from "../../Common/FormControl/Button";
import {Close, Delete, Edit, Open} from "../../Common/Icons/Icons";
import {useNavigate} from "react-router-dom";
import {EmployerVacancyType} from "../../../types/types";

interface Props {
    vacancy: EmployerVacancyType
    closeVacancy: () => void
    deleteVacancy: () => void
}

const VacanciesItem: React.FC<Props> = (props) => {
    const navigate = useNavigate();

    return (
        <li className={classes.VacanciesTableWrapper}>
            <div>{props.vacancy.name}</div>
            <div>(???)</div>
            <div>{props.vacancy.count - props.vacancy.free} из {props.vacancy.count}</div>
            <div>{props.vacancy.is_open ? "Открыта" : "Закрыта"}</div>
            <div className={classes.VacanciesButtons}>
                <Button type={"button"} size={"small"} to={`/vacancies/${props.vacancy.id}`}>Страница вакансии</Button>
                {
                    props.vacancy.is_open &&
                    <>
                        <Edit onClick={() => navigate(`/vacancies/${props.vacancy.id}/edit`)}/>
                        <Close onClick={() => console.log('Close')}/>
                    </>
                }
                {
                    !props.vacancy.is_open &&
                    <>
                        <Open onClick={() => console.log('Open')}/>
                        <Delete onClick={props.deleteVacancy}/>
                    </>
                }
            </div>
        </li>
    );
}

export default VacanciesItem;