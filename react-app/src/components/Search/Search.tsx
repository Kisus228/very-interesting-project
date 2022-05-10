import React, {useEffect, useState} from 'react';
import ProfileList from "../ProfileList/ProfileList";
import {getVacanciesTC} from "../../redux/VacansyReducer";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/ReduxStore";
import {getResumesTC, likeResumeTC} from "../../redux/ResumeReducer";
import classes from "../ProfileList/ProfileList.less";
import Filter from "../Filter/Filter";
import avatar from "../../assets/avatar.png";
import LikeButton from "../Common/FormControl/LikeButton";
import Button from "../Common/FormControl/Button";
import {ResumeType} from "../../types/types";
import {getFilterTC} from "../../redux/FilterReducer";

const Search: React.FC<Props> = (props) => {
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
            <div className={classes.PageContainer}>
                <div>
                    <Filter setFilter={() => setFilter(selectedFilter)} filter={props.filter}
                            selectedFilter={selectedFilter}/>
                </div>
                <div>
                    <h2>Найдено людей по запросу: {props.resumes.length}</h2>
                    <ul className={classes.ProfileItemsWrapper}>
                        {
                            props.resumes.map(resume => <ProfileItem key={resume.id} resume={resume}
                                                                     likeResumeTC={props.likeResumeTC}/>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

const ProfileItem = (props: { resume: ResumeType, likeResumeTC: (id: number, resumePage: boolean) => void }) => {
    const onClickLikeButton = () => {
        props.likeResumeTC(props.resume.id, false);
    }

    return (
        <li className={classes.ProfileItem}>
            <div className={classes.ProfileAvatar}>
                <img width={125} height={125} src={avatar} alt="avatar"/>
            </div>
            <div className={classes.ProfileInfo}>
                <h3 className={classes.ProfileName}>{props.resume.name}</h3>
                <p>Специальность: {props.resume.specialization}</p>
                <p>Стаж: {props.resume.experience} лет</p>
                <p>Навыки: {props.resume.skills.join(", ")}</p>
            </div>
            <div className={classes.ProfileAction}>
                <LikeButton liked={props.resume.is_liked} onClick={onClickLikeButton}/>
                <Button type={"button"} size={"large"} to={`/search/${props.resume.id}`}>
                    Посмотреть профиль
                </Button>
            </div>
        </li>
    );
}

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
}))(Search);
