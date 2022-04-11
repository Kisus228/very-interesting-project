import React, {useState} from 'react';
import ProfileList from "../ProfileList/ProfileList";

// TODO: Сергей Кашкин: Когда появится бэк и запросы, убрать эту компоненту, а к компоненте Search добавить запрос на основе url.

const Liked = () => {
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
    ]
    const [state] = useState(defaultState);

    return (
        <ProfileList state={state}/>
    );
};

export default Liked;
