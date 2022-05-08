import React, {useState} from 'react';
import classes from './WorkerVacancies.less';
import Filter from "../../Filter/Filter";
import {useNavigate} from "react-router-dom";
import avatar from "../../../assets/avatar.png"
import LikeButton from "../../Common/FormControl/LikeButton";
import Button from "../../Common/FormControl/Button";

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

const WorkerVacancies = () => {
    const defaultState = [
        {
            id: 0,
            name: "Front-end программист",
            description: "Разработка сайта по улучшению коммуникации сотрудников внутри компании",
            avatar: undefined,
            free: 2,
            competence: ["Пить пиво", "Смотреть телик"],
            liked: true,
        },
        {
            id: 1,
            name: "Back-end программист",
            description: "Разработка сайта по улучшению коммуникации сотрудников внутри компании",
            avatar: undefined,
            free: 1,
            competence: ["Убивать чудовищ", "Играть в гвинт"],
            liked: true,
        },
    ]
    const [state] = useState(defaultState);

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainer}>
                <div>
                    <Filter/>
                </div>
                <div>
                    <h2>Найдено вакансий по запросу: {state.length}</h2>
                    <ul className={classes.ProfileItemsWrapper}>
                        {
                            state.map(item => <VacancyItem key={item.id} {...item}/>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

const VacancyItem = (props: ProfileItemType) => {
    const [liked, setLiked] = useState(props.liked);
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
                <p>Навыки: {props.competence.join(", ")}</p>
            </div>
            <div className={classes.ProfileAction}>
                <LikeButton liked={liked} onClick={() => setLiked(!liked)}/>
                <Button type={"button"} size={"large"} to={`/search/${props.id}`}>
                    Посмотреть профиль
                </Button>
            </div>
        </li>
    );
}

export default WorkerVacancies;