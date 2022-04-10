import React, {useState} from 'react';
import classes from './ProfileInfo.less';
import {useParams} from "react-router-dom";
import Button from "../Common/FormControl/Button";
import avatar from "../../assets/avatar.png";
import LikeButton from "../Common/FormControl/LikeButton";

const ProfileInfo = () => {
    const defaultState = {
        id: 0,
        name: "Дядя Богдан",
        speciality: "Профессиональный лентяй",
        avatar: undefined,
        experience: 10,
        competence: ["Пить пиво", "Смотреть телик"],
        liked: true,
        desiredVacancy: "Имитатор программиста",
        resume: "Это ваше мнение, сформированно ошибочно, намеренно или случайно. Оно не совпадает ни с моим мнением, ни с мнением Ильи Николаевича, ни с мнением экспертов, которые вас слушали. У вас есть выбор, все-таки находится в коммуникации со внешним миром, в том числе и с критической оценкой, полученной на ваш проект, либо обижаться на всех и вся, что вас якобы незаслуженно обидели. Судя по тому, что вы не попытались хотя бы узнать о консультации и сходить на нее и как-то стараться дальше взаимодействовать, даже в случае отрицательной оценки на ваш проект, вы выбираете второй вариант, высказываясь о бесполезности дальнейшего взаимодействия. Это ваше право. Однако, еще раз замечу, что ваше впечатление ошибочно. Надеюсь, другие ребята будут поступать мудрее в аналогичной ситуации.",
        aboutMe: "Сергей 19 лет, настоящий кекс., обучается в ирит-ртф, обладает навыками программиста и дизайнера, а также работал проводником. Гордится тем, что добился всего сам. Сергей больше не станет тратить время на моделей и кривляк с завышенной самооценкой. Ищет путеводную звезду для его сердца.",
        contacts: {
            vk: "https://vk.com/vsalt",
            gh: "https://github.com/VsALT2000",
            mail: "sergey.k.alt2000@gmail.com",
        }
    }
    const [state] = useState(defaultState)
    const [liked, setLiked] = useState(state.liked);

    const params = useParams(); // Number(params.profileId)
    return (
        <div className={classes.ContentWrapperWithFilter}>
            <div className={classes.ProfileMenu}>
                <div className={classes.ProfileAvatar}>
                    <img width={150} height={150} src={avatar} alt={"avatar"}/>
                </div>
                <Button color={"red"}>Связаться</Button>
                <Button>Принять заявку</Button>
                <div className={classes.ProfileContacts}>
                    <h4>Контактные данные:</h4>
                    {
                        Object.keys(state.contacts).map(key =>
                            <LinkParagraph linkName={key} key={key}
                                           link={state.contacts[key as keyof typeof state.contacts]}/>
                        )
                    }
                </div>
            </div>
            <div className={classes.ProfileInfo}>
                <div>
                    <div className={classes.ProfileInfoHeader}>
                        <h2>{state.name}</h2>
                        <LikeButton liked={liked} onClick={() => setLiked(!liked)}/>
                    </div>
                    <p>Специальность: {state.speciality}</p>
                    <p>Стаж: {state.experience} лет</p>
                    <p>Навыки: {state.competence.join(", ")}</p>
                </div>
                <div>
                    <h3>Желаемая вакансия:</h3>
                    <div className={classes.VacancyWrapper}>
                        <p>{state.desiredVacancy}</p>
                        <Button size={"small"}>Страница вакансии</Button>
                    </div>
                </div>
                <div>
                    <h3>Резюме:</h3>
                    <p>{state.resume}</p>
                    <h3>О себе:</h3>
                    <p>{state.aboutMe}</p>
                </div>
            </div>
        </div>
    );
};

enum ContactsType {
    vk = "VK",
    gh = "Github",
    mail = "Почта",
    tg = "Telegram",
}

const LinkParagraph = (props: { linkName: string, link: string }) => {
    const name = ContactsType[props.linkName as keyof typeof ContactsType];

    if (name === ContactsType.mail) {
        return (
            <p className={classes.LinkParagraph}>{name}: {props.link}</p>
        )
    }

    return (
        <p className={classes.LinkParagraph}>
            <a target="_blank" href={props.link}>{name}</a>
        </p>
    );
}

export default ProfileInfo;