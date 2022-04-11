import React, {useState} from 'react';
import ProfileList from "../ProfileList/ProfileList";

const Search = () => {
    const defaultState = [
        {
            id: 0,
            name: "Дядя Богдан",
            speciality: "Профессиональный лентяй",
            avatar: undefined,
            experience: 10,
            competence: ["Пить пиво", "Смотреть телик"],
            liked: true,
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
    const [state] = useState(defaultState);

    return (
        <ProfileList state={state}/>
    );
};

export default Search;
