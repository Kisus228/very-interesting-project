import React, {useEffect, useState} from 'react';
import classes from './Vacancies.less';
import Filter from "../../Filter/Filter";
import {AppStateType} from "../../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {getFilterTC} from "../../../redux/FilterReducer";
import {getVacanciesTC, likeVacancyTC} from "../../../redux/WorkerVacancyReducer";
import VacancyItem from "./VacancyItem";

const SearchVacancies: React.FC<Props> = (props) => {
    const [filter, setFilter] = useState<number[]>([]);
    const selectedFilter = Array.from(filter);

    useEffect(() => {
        props.getVacanciesTC(filter);
    }, [filter])

    useEffect(() => {
        props.getFilterTC();
    }, [])

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainerWithFilter}>
                <div>
                    <Filter setFilter={() => setFilter(selectedFilter)} filter={props.filter}
                            selectedFilter={selectedFilter}/>
                </div>
                <div>
                    <h2>Найдено вакансий по запросу: {props.vacancies.length}</h2>
                    <ul className={classes.ProfileItemsWrapper}>
                        {
                            props.vacancies.map(item => <VacancyItem key={item.id} {...item}/>)
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
    getVacanciesTC: (filter: number[]) => void
    getFilterTC: () => void
    likeVacancyTC: (id: number, vacancyPage: boolean) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {
    getVacanciesTC,
    getFilterTC,
    likeVacancyTC
}))(SearchVacancies);