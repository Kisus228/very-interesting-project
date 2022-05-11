import React from 'react';
import classes from './VacanciesRequests.less';
import Button from "../../Common/FormControl/Button";
import {useNavigate} from "react-router-dom";

interface Props {
    vacancy: any
}

const VacanciesItem: React.FC<Props> = (props) => {
    const navigate = useNavigate();

    return (
        <li className={classes.VacanciesTableWrapper}>
            <div className={classes.Info}>{props.vacancy.name}</div>
            <div className={classes.Description}>{props.vacancy.description}</div>
            <div className={classes.Info}>{props.vacancy.status ? "Принят" : "На рассмотрении"}</div>
            <div className={classes.VacanciesButtons}>
                <Button type={"button"} size={"small"} to={`/search/${props.vacancy.id}`}>Страница вакансии</Button>
            </div>
        </li>
    );
}

export default VacanciesItem;