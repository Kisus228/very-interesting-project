import React from 'react';
import classes from './Vacancies.less';
import Button from "../../Common/FormControl/Button";
import {Close, Delete, Edit, Open} from "../../Common/Icons/Icons";
import {useNavigate} from "react-router-dom";
import {EmployerVacancyType} from "../../../types/types";

interface Props {
    vacancy: EmployerVacancyType
    openCloseVacancy: () => void
    deleteVacancy: () => void
}

const VacanciesItem: React.FC<Props> = (props) => {
    const navigate = useNavigate();

    return (
        <li className={classes.VacanciesTableWrapper}>
            <div className={classes.Name} title={props.vacancy.name}>{props.vacancy.name}</div>
            <div className={classes.Info}>{props.vacancy.count_job_app}</div>
            <div className={classes.Info}>{props.vacancy.count - props.vacancy.free} из {props.vacancy.count}</div>
            <div className={classes.Info}>{props.vacancy.is_open ? "Открыта" : "Закрыта"}</div>
            <div className={classes.VacanciesButtons}>
                <Button type={"button"} size={"small"} to={`/vacancies/${props.vacancy.id}`}>Страница вакансии</Button>
                {
                    props.vacancy.is_open &&
                    <>
                        <Edit onClick={() => navigate(`/vacancies/${props.vacancy.id}/edit`)}/>
                        <Close onClick={props.openCloseVacancy}/>
                    </>
                }
                {
                    !props.vacancy.is_open &&
                    <>
                        <Open onClick={props.openCloseVacancy}/>
                        <Delete onClick={props.deleteVacancy}/>
                    </>
                }
            </div>
        </li>
    );
}

export default VacanciesItem;
