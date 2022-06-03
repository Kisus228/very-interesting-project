import React, {useEffect} from 'react';
import classes from './ProfileInfo.less';
import {useParams} from "react-router-dom";
import Button from "../../Common/FormControl/Button";
import avatar from "../../../assets/avatar.png";
import LikeButton from "../../Common/FormControl/LikeButton";
import {compose} from "redux";
import {connect} from "react-redux";
import {acceptApplicationTC, getResumeTC, likeResumeTC} from "../../../redux/ResumeReducer";
import {AppStateType} from "../../../redux/ReduxStore";
import {withLoading} from "../../../hoc/withLoading/withLoading";
import Contacts from "../../Common/Contacts/Contacts";

const ProfileInfo: React.FC<Props> = (props) => {
    const profileId = Number(useParams().profileId);

    useEffect(() => {
        if (!isNaN(profileId)) {
            props.getResumeTC(profileId);
        }
    }, [])

    if (props.resume === null) return null

    const onClickLikeButton = () => {
        props.likeResumeTC(profileId, true);
    }

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainer}>
                <div className={classes.ProfileMenu}>
                    <div className={classes.ProfileAvatarWrapper}>
                        <div className={classes.ProfileAvatar}>
                            <img width={150} height={150} src={props.photo || avatar} alt={"avatar"}/>
                        </div>
                    </div>
                    <div className={classes.ProfileContacts}>
                        <h4>Контактные данные:</h4>
                        <Contacts contacts={props.resume}/>
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
                            <LikeButton liked={props.resume.is_liked} onClick={onClickLikeButton}/>
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
                                        <Button type={"button"} size={"small"}
                                                onClick={() => props.acceptApplicationTC(item.id_job_app)}>
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
        photo: state.resumeData.photo
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getResumeTC: (id: number) => void
    likeResumeTC: (id: number, resumePage: boolean) => void
    acceptApplicationTC: (acceptId: number) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {
    getResumeTC,
    likeResumeTC,
    acceptApplicationTC
}), withLoading)(ProfileInfo);
