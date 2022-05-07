import React, {useState} from 'react';
import ProfileList from "../ProfileList/ProfileList";
import {getVacanciesTC} from "../../redux/VacansyReducer";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/ReduxStore";

const Search: React.FC<Props> = (props) => {
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

    /*useEffect(() => {
        props.getVacancyTC()
    })*/

    return (
        <ProfileList state={state}/>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        vacancy: state.vacancyData.vacancy,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getVacancyTC: () => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {getVacancyTC: getVacanciesTC}))(Search);
