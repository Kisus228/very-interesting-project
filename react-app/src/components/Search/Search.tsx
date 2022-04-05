// @ts-ignore
import classes from './Search.less';
import React, {useState} from 'react';
import Filter from "../Filter/Filter";
import avatar from "./../../assets/avatar.png";

type StateType = {
    id: number,
    name: string,
    speciality: string,
    avatar: any,
    experience: number,
    competence: string[],
    liked: boolean,
}

const Search = () => {
    const defaultState = [
        {
            id: 0,
            name: "Дядя Богдан",
            speciality: "Профессиональный лентяй",
            avatar: undefined,
            experience: 10,
            competence: ["Пить пиво", "Смотреть телик"],
            liked: false,
        },
        {
            id: 1,
            name: "Геральт из Ривии",
            speciality: "Ведьмак",
            avatar: undefined,
            experience: 70,
            competence: ["Убивать чудовищ", "Играть в гвинт"],
            liked: true,
        },
        {
            id: 2,
            name: "qwerty",
            speciality: "qwerty",
            avatar: undefined,
            experience: 0,
            competence: ["Java", "C"],
            liked: false,
        },
    ]
    const [state] = useState<StateType[]>(defaultState)

    return (
        <div className={classes.SearchWrapper}>
            <div>
                <Filter />
            </div>
            <div>
                <h2>Найдено по запросу: 67 человек</h2>
                <ul className={classes.ProfileItemsWrapper}>
                    {
                        state.map(item => <ProfileItem key={item.id} {...item}/>)
                    }
                </ul>
            </div>
        </div>
    );
};

const ProfileItem = (props: StateType) => {
    return (
        <li className={classes.ProfileItem}>
            <div className={classes.ProfileAvatar}>
                <img width={100} height={100} src={avatar} alt="avatar"/>
            </div>
            <div className={classes.ProfileInfo}>
                <h3 className={classes.ProfileName}>{props.name}</h3>
                <p>Специальность: {props.speciality}</p>
                <p>Стаж: {props.experience} лет</p>
                <p>Навыки: {props.competence}</p>
            </div>
            <div>1</div>
        </li>
    );
}

export default Search;