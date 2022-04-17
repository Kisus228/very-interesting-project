import React from 'react';
import classes from './Navigation.less';
import {NavLink, useNavigate} from "react-router-dom";
import {Back, Liked, Plus, Search} from "../Common/Icons/Icons";

const Navigation = () => {
    const navigate = useNavigate();

    return (
        <div className={classes.NavigationWrapper}>
            <ul className={classes.Navigation}>
                <li>
                    <NavLink to={'/liked'} className={({isActive}) => isActive ? classes.active : undefined}>
                        <Liked/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/search'} className={({isActive}) => isActive ? classes.active : undefined}>
                        <Search/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/vacancies'} className={({isActive}) => isActive ? classes.active : undefined}>
                        <Plus/>
                    </NavLink>
                </li>
            </ul>
            <div className={classes.PreviousPage} onClick={() => navigate(-1)}>
                <Back/>
            </div>
        </div>
    );
};

export default Navigation;
