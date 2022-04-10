import React, {useEffect, useState} from 'react';
import classes from './Navigation.less';
import {NavLink, useLocation} from "react-router-dom";

const Navigation = () => {
    const url = useLocation().pathname;
    const pathname = url.split('/')[1];
    return (
        <ul className={classes.Navigation}>
            <li>
                <NavLink to={'/liked'} className={pathname === 'liked' ? classes.active : undefined}>
                    <svg width="20" height="20" viewBox="0 0 20 17.925" fill="none">
                        <path
                            d="M9.29334 2.42109L10 3.12684L10.7067 2.42109C12.6039 0.526302 15.6804 0.526302 17.5776 2.42109C19.4741 4.31518 19.4741 7.38556 17.5776 9.27964L10 16.8476L2.42238 9.27964C0.525872 7.38556 0.525872 4.31518 2.42238 2.42109C4.3196 0.526302 7.39613 0.526302 9.29334 2.42109Z"
                            strokeWidth="2"/>
                    </svg>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/search'} className={pathname === 'search' ? classes.active : undefined}>
                    <svg width="20" height="20" viewBox="-2 0 20 20" fill="none">
                        <path
                            d="M17.0014 9.00071C17.0014 13.4194 13.4194 17.0014 9.00071 17.0014C4.58204 17.0014 1 13.4194 1 9.00071C1 4.58204 4.58204 1 9.00071 1C13.4194 1 17.0014 4.58204 17.0014 9.00071Z"
                            strokeWidth="2"/>
                    </svg>
                    <svg width="20" height="20" viewBox="0 -14 20 20" fill="none">
                        <path d="M1 5L5 1" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/123'} className={pathname === '/123' ? classes.active : undefined}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 1V10M10 10V19M10 10H1M10 10H19" strokeWidth="2"
                              strokeLinecap="round"/>
                    </svg>
                </NavLink>
            </li>
        </ul>
    );
};

export default Navigation;