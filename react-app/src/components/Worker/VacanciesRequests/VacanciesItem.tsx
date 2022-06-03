import React from 'react';
import classes from './VacanciesRequests.less';
import Button from "../../Common/FormControl/Button";
import {ApplicationsType} from "../../../types/types";

interface Props {
    vacancy: ApplicationsType
}

const VacanciesItem: React.FC<Props> = (props) => {
    return (
        <li className={classes.VacanciesTableWrapper}>
            <div className={classes.Info} title={props.vacancy.name}>{props.vacancy.name}</div>
            <div className={classes.Description} title={props.vacancy.description}>{props.vacancy.description}</div>
            <div className={classes.Info}>{props.vacancy.status ? "Принят" : "На рассмотрении"}</div>
            <div className={classes.VacanciesButtons}>
                <Button type={"button"} size={"small"} to={`/search/${props.vacancy.id}`}>Страница вакансии</Button>
            </div>
        </li>
    );
}

export default VacanciesItem;
