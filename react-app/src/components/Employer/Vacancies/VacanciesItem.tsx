import React from 'react';
import classes from './Vacancies.less';
import Button from "../../Common/FormControl/Button";
import {Close, Delete, Edit, Open} from "../../Common/Icons/Icons";
import {useNavigate} from "react-router-dom";
import {VacancyType} from "../../../types/types";

const VacanciesItem: React.FC<VacancyType> = (props) => {
    const navigate = useNavigate();

    return (
        <li className={classes.VacanciesTableWrapper}>
            <div>{props.name}</div>
            <div>(???)</div>
            <div>{props.count - props.free} из {props.count}</div>
            <div>{props.is_open ? "Открыта" : "Закрыта"}</div>
            <div className={classes.VacanciesButtons}>
                <Button type={"button"} size={"small"} to={`/vacancies/${props.id}`}>Страница вакансии</Button>
                {
                    props.is_open &&
                    <>
                        <Edit onClick={() => navigate(`/vacancies/${props.id}/edit`)}/>
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

export default VacanciesItem;