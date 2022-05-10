import React from 'react';
import classes from './Navigation.less';
import {NavLink, useNavigate} from "react-router-dom";
import {Back, Liked, Plus, Search, Work} from "../Common/Icons/Icons";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/ReduxStore";

const Navigation: React.FC<MapStatePropsType> = (props) => {
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
                {
                    props.isWorker
                        ? <li>
                            <NavLink to={"/"} className={({isActive}) => isActive ? classes.active : undefined}>
                                <Work/>
                            </NavLink>
                        </li>
                        : <li>
                            <NavLink to={'/vacancies'} className={({isActive}) => isActive ? classes.active : undefined}>
                                <Plus/>
                            </NavLink>
                        </li>
                }
            </ul>
            <div className={classes.PreviousPage} onClick={() => navigate(-1)}>
                <Back/>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        isWorker: state.authData.isWorker,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

export default compose<React.ComponentType>(connect(mapStateToProps, {}))(Navigation);
