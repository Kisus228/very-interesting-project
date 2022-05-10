import React, {useEffect, useState} from 'react';
import classes from './ProfileInfo.less';
import {useParams} from "react-router-dom";
import Button from "../../Common/FormControl/Button";
import avatar from "../../../assets/avatar.png";
import LikeButton from "../../Common/FormControl/LikeButton";
import {compose} from "redux";
import {connect} from "react-redux";
import {getResumeTC} from "../../../redux/ResumeReducer";
import {AppStateType} from "../../../redux/ReduxStore";

const ProfileInfo: React.FC<Props> = (props) => {
    const profileId = Number(useParams().profileId);

    useEffect(() => {
        if (!isNaN(profileId))
            props.getResumeTC(profileId);
    }, [])
    const [liked, setLiked] = useState(props.resume?.is_liked ?? false);

    if (props.resume === null) return null

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainer}>
                <div className={classes.ProfileMenu}>
                    <div className={classes.ProfileAvatar}>
                        <img width={150} height={150} src={avatar} alt={"avatar"}/>
                    </div>
                    <div className={classes.ProfileContacts}>
                        <h4>Контактные данные:</h4>
                        {
                            props.resume.vk && <p className={classes.LinkParagraph}>
                                <a target="_blank" href={props.resume.vk}>VK</a>
                            </p>
                        }
                        {
                            props.resume.tg && <p className={classes.LinkParagraph}>
                                <a target="_blank" href={props.resume.tg}>Telegram</a>
                            </p>
                        }
                        {
                            props.resume.github && <p className={classes.LinkParagraph}>
                                <a target="_blank" href={props.resume.github}>Github</a>
                            </p>
                        }
                        {
                            props.resume.gitlab && <p className={classes.LinkParagraph}>
                                <a target="_blank" href={props.resume.gitlab}>Gitlab</a>
                            </p>
                        }
                        {
                            props.resume.email && <p className={classes.LinkParagraph}>
                                Email: {props.resume.email}
                            </p>
                        }
                    </div>
                </div>
                <div className={classes.ProfileInfo}>
                    <div>
                        <div className={classes.ProfileInfoHeader}>
                            <h2>{props.resume.name}</h2>
                            <LikeButton liked={liked} onClick={() => setLiked(!liked)}/>
                        </div>
                        <p>Специальность: {props.resume.specialization}</p>
                        <p>Стаж: {props.resume.experience} лет</p>
                        <p>Навыки: {props.resume.skills.join(", ")}</p>
                    </div>
                    {
                        props.resume.desired_vacancies.length
                            ? <div>
                                <h3>Желаемые вакансии:</h3>
                                {props.resume.desired_vacancies.map(item => (
                                    <div key={item.id_vacancy} className={classes.VacancyWrapper}>
                                        <p>{item.name}</p>
                                        <Button type={"button"} size={"small"} onClick={() => console.log('принять')}>
                                            Принять заявку
                                        </Button>
                                        <Button type={"button"} size={"small"} to={`/vacancies/${item.id_vacancy}`}>
                                            Страница вакансии
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            : null
                    }
                    <div>
                        <h3>Резюме:</h3>
                        <p>{props.resume.resume_text}</p>
                        <h3>О себе:</h3>
                        <p>{props.resume.about_me}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        resume: state.resumeData.resume,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getResumeTC: (id: number) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {getResumeTC}))(ProfileInfo);
