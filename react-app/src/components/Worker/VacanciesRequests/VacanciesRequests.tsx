import React, {useEffect} from 'react';
import classes from './VacanciesRequests.less';
import VacanciesItem from "./VacanciesItem";
import {AppStateType} from "../../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import cn from "classnames";
import {getApplicationsTC} from "../../../redux/WorkerVacancyReducer";

const VacanciesRequests: React.FC<Props> = (props) => {
    useEffect(() => {
        props.getApplicationsTC();
    }, [])

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainer}>
                <div className={classes.PageHeader}>
                    <h2>Мои заявки на вакансии</h2>
                </div>
                <div className={classes.VacanciesTable}>
                    <div className={cn(classes.VacanciesWrapper, classes.VacanciesTableHeader,
                        classes.VacanciesTableWrapper)}>
                        <div className={classes.Info}>Название</div>
                        <div className={classes.Description}>Описание</div>
                        <div className={classes.Info}>Статус</div>
                    </div>
                    <ul>
                        {
                            props.applications.map(item =>
                                <VacanciesItem key={item.id} vacancy={item}/>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        applications: state.workerVacancyData.applications,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getApplicationsTC: () => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {
    getApplicationsTC
}))(VacanciesRequests);
