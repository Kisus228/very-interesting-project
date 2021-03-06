import React, {useState} from 'react';
import classes from "./Header.less";
import logo from './../../assets/logo.png';
import avatar from './../../assets/avatar.png';
import {useNavigate} from "react-router-dom";
import {Arrow, Burger, Exit} from "../Common/Icons/Icons";
import {compose} from "redux";
import {connect} from "react-redux";
import {deleteAuthLoginTC} from "../../redux/AuthReducer";
import {AppStateType} from "../../redux/ReduxStore";

const Header: React.FC<Props> = (props) => {
    const [openedProfileMenu, setOpenedProfileMenu] = useState(false);
    const navigate = useNavigate();

    const onClickProfileInfo = () => {
        setOpenedProfileMenu(true);
    }

    const onBlurProfileInfo = () => {
        setOpenedProfileMenu(false);
    }

    const onClickProfileMenu = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        setOpenedProfileMenu(false);
        navigate("profile");
    }

    return (
        <header className={classes.Header}>
            <div className={classes.Logo}>
                <Burger onClick={props.onClickNavbarToggle}/>
                <img width={110} height={28} src={logo} alt={"logo"}/>
            </div>
            <div className={classes.Menu}>
                <button className={classes.Button} onClick={onClickProfileInfo} onBlur={onBlurProfileInfo}>
                    <div className={classes.ProfileInfo}>
                        <p>{props.name + " " + props.lastName}</p>
                        <p className={classes.Description}>
                            {
                                props.isHeadDepartment ? "Руководитель направления" : "Сотрудник"
                            }
                        </p>
                    </div>
                    <div className={classes.ProfileAvatar}>
                        <img width={40} height={40} src={props.photo || avatar} alt={"avatar"}/>
                    </div>
                    <div>
                        <Arrow color={"#C9CED6"}/>
                    </div>
                    {
                        openedProfileMenu &&
                        <div className={classes.ProfileMenuWrapper}>
                            <div onClick={onClickProfileMenu} className={classes.ProfileMenuContent}>
                                <svg width="20" height="20" viewBox="0 0 25 30" fill="none">
                                    <path
                                        d="M8.07692 8H17.8077M8.07692 22H17.8077M8.07692 15H16.0385M23 1H2C1.44772 1 1 1.44771 1 2V28C1 28.5523 1.44772 29 2 29H23C23.5523 29 24 28.5523 24 28V2C24 1.44771 23.5523 1 23 1Z"
                                        stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Мой профиль</span>
                            </div>
                        </div>
                    }
                </button>
                <div className={classes.Stroke}/>
                <button className={classes.Button} onClick={() => props.deleteAuthLoginTC()}>
                    <Exit/>
                </button>
            </div>
        </header>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        auth: state.authData.auth,
        name: state.authData.name,
        lastName: state.authData.lastName,
        isHeadDepartment: state.authData.isHeadDepartment,
        photo: state.authData.photo
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    deleteAuthLoginTC: () => void
}

type OwnProps = {
    onClickNavbarToggle: () => void
}

type Props = MapStatePropsType & MapDispatchPropsType & OwnProps;

export default compose(connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, {
    deleteAuthLoginTC
}))(Header);
