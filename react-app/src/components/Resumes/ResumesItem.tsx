import React, {useState} from 'react';
import classes from './ResumesItem.less';
import Filter from "../Filter/Filter";
import {useNavigate} from "react-router-dom";
import avatar from "../../assets/avatar.png";
import LikeButton from "../Common/FormControl/LikeButton";
import Button from "../Common/FormControl/Button";
import {ResumeType} from "../../types/types";

const ResumesItem = (props: { resume: ResumeType, likeResumeTC: (id: number, resumePage: boolean) => void }) => {
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

export default ResumesItem;