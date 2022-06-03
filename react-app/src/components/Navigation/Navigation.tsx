import React from 'react';
import classes from './Navigation.less';
import {NavLink, useNavigate} from "react-router-dom";
import {Back, Liked, Plus, Search, Work} from "../Common/Icons/Icons";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/ReduxStore";
import cn from "classnames";

const Navigation: React.FC<Props> = (props) => {
    const navigate = useNavigate();

    return (
        <div className={cn(classes.NavigationWrapper, {[classes.Open]: props.navbarToggle})}>
            <ul className={classes.Navigation}>
                <li>
                    <NavLink to={'/liked'} className={({isActive}) => isActive ? classes.active : undefined}>
                        <Liked/>
                        <span>Избранное</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/search'} className={({isActive}) => isActive ? classes.active : undefined}>
                        <Search/>
                        <span>Поиск</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/vacancies"} className={({isActive}) => isActive ? classes.active : undefined}>
                        {props.isHeadDepartment ? <Plus/> : <Work/>}
                        <span>Вакансии</span>
                    </NavLink>
                </li>
            </ul>
            <div className={classes.PreviousPage} onClick={() => navigate(-1)}>
                <Back/>
                <span>Назад</span>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        isHeadDepartment: state.authData.isHeadDepartment,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {}

type Props = MapStatePropsType & MapDispatchPropsType & OwnProps;

type OwnProps = {
    navbarToggle: boolean
}

export default compose(connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, {}))(Navigation);
