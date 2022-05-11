import React, {useEffect, useState} from 'react';
import ResumesItem from "./ResumesItem";
import classes from "./ResumesItem.less";
import Filter from "../Filter/Filter";
import {AppStateType} from "../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {getLikedResumesTC, getResumesTC, likeResumeTC} from "../../redux/ResumeReducer";
import {getFilterTC} from "../../redux/FilterReducer";

// TODO: Сергей Кашкин: Когда появится бэк и запросы, убрать эту компоненту, а к компоненте Resumes добавить запрос на основе url.

const LikedResumes: React.FC<Props> = (props) => {
    useEffect(() => {
        props.getLikedResumesTC();
    }, [])

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainerWithoutFilter}>
                <div>
                    <h2>Людей в избранном: {props.resumes.length}</h2>
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
        resumes: state.resumeData.resumes,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getLikedResumesTC: () => void
    likeResumeTC: (id: number, resumePage: boolean) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {
    getLikedResumesTC,
    likeResumeTC
}))(LikedResumes);
