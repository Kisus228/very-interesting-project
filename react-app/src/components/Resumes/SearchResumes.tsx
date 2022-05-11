import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/ReduxStore";
import {getResumesTC, likeResumeTC} from "../../redux/ResumeReducer";
import classes from "./ResumesItem.less";
import Filter from "../Filter/Filter";
import {getFilterTC} from "../../redux/FilterReducer";
import ResumesItem from "./ResumesItem";

const SearchResumes: React.FC<Props> = (props) => {
    const [filter, setFilter] = useState<number[]>([]);
    const selectedFilter = Array.from(filter);

    useEffect(() => {
        props.getResumesTC(filter);
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
                    <h2>Найдено людей по запросу: {props.resumes.length}</h2>
                    <ul className={classes.ProfileItemsWrapper}>
                        {
                            props.resumes.map(resume => <ResumesItem key={resume.id} resume={resume}
                                                                     likeResumeTC={props.likeResumeTC}/>)
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
        resumes: state.resumeData.resumes,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getResumesTC: (filter: number[]) => void
    getFilterTC: () => void
    likeResumeTC: (id: number, resumePage: boolean) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {
    getResumesTC,
    getFilterTC,
    likeResumeTC
}))(SearchResumes);
