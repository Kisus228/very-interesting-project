import React, {useEffect} from 'react';
import classes from './Vacancies.less';
import {AppStateType} from "../../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {getFilterTC} from "../../../redux/FilterReducer";
import {getLikedVacanciesTC, likeVacancyTC} from "../../../redux/WorkerVacancyReducer";
import VacancyItem from "./VacancyItem";

const LikedVacancies: React.FC<Props> = (props) => {
    useEffect(() => {
        props.getLikedVacanciesTC();
    }, [])

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainerWithoutFilter}>
                <div>
                    <h2>Вакансий в избранном: {props.vacancies.length}</h2>
                    <ul className={classes.ProfileItemsWrapper}>
                        {
                            props.vacancies.map(item => <VacancyItem key={item.id} vacancy={item}
                                                                     likeVacancyTC={props.likeVacancyTC}/>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        filter: state.filterData.filter,
        vacancies: state.workerVacancyData.vacancies,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getLikedVacanciesTC: () => void
    getFilterTC: () => void
    likeVacancyTC: (id: number, resumePage: boolean) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {
    getLikedVacanciesTC,
    getFilterTC,
    likeVacancyTC
}))(LikedVacancies);