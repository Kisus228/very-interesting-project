import React, {useState} from 'react';
import classes from './Vacancies.less';
import Filter from "../../Filter/Filter";
import {useNavigate} from "react-router-dom";
import avatar from "../../../assets/avatar.png"
import LikeButton from "../../Common/FormControl/LikeButton";
import Button from "../../Common/FormControl/Button";
import {WorkerVacancyType} from "../../../types/types";

interface PropsType {
    state: ProfileItemType[];
}

type ProfileItemType = {
    id: number,
    name: string,
    description: string,
    avatar: any,
    free: number,
    competence: string[],
    liked: boolean,
}

const VacancyItem = (props: WorkerVacancyType) => {
    const [liked, setLiked] = useState(props.is_liked);
    const navigate = useNavigate();
    return (
        <li className={classes.ProfileItem}>
            <div className={classes.ProfileAvatar}>
                <img width={125} height={125} src={avatar} alt="avatar"/>
            </div>
            <div className={classes.ProfileInfo}>
                <h3 className={classes.ProfileName}>{props.name}</h3>
                <p>Описание: {props.description}</p>
                <p>Вакантных мест: {props.free}</p>
                <p>Навыки: {props.skills.join(", ")}</p>
            </div>
            <div className={classes.ProfileAction}>
                <LikeButton liked={liked} onClick={() => setLiked(!liked)}/>
                <Button type={"button"} size={"large"} to={`/search/${props.id}`}>
                    Посмотреть вакансию
                </Button>
            </div>
        </li>
    );
}

export default VacancyItem;