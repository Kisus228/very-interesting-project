import React from 'react';
import classes from './Vacancies.less';
import avatar from "../../../assets/avatar.png"
import LikeButton from "../../Common/FormControl/LikeButton";
import Button from "../../Common/FormControl/Button";
import {WorkerVacancyType} from "../../../types/types";

const VacancyItem = (props: { vacancy: WorkerVacancyType, likeVacancyTC: (id: number, vacancyPage: boolean) => void }) => {
    return (
        <li className={classes.ProfileItem}>
            <div className={classes.ProfileAvatar}>
                <img width={125} height={125} src={avatar} alt="avatar"/>
            </div>
            <div className={classes.ProfileInfo}>
                <h3 className={classes.ProfileName}>{props.vacancy.name}</h3>
                <p>Описание: {props.vacancy.description}</p>
                <p>Вакантных мест: {props.vacancy.free}</p>
                <p>Навыки: {props.vacancy.skills.join(", ")}</p>
            </div>
            <div className={classes.ProfileAction}>
                <LikeButton liked={props.vacancy.is_liked} onClick={() => props.likeVacancyTC(props.vacancy.id, false)}/>
                <Button type={"button"} size={"large"} to={`/search/${props.vacancy.id}`}>
                    Посмотреть вакансию
                </Button>
            </div>
        </li>
    );
}

export default VacancyItem;