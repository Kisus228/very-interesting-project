import React from 'react';
import classes from './Icons.less';

export const Arrow = (props: { color: string }) => {
    return (
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d="M1 1L7 7L13 1" stroke={props.color} strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    );
};

export const Burger = (props: { onClick: () => void }) => {
    return (
        <svg onClick={props.onClick} className={classes.Clickable} width="20" height="18" viewBox="0 0 20 18"
             fill="none">
            <line x1="2" y1="15" x2="18" y2="15" stroke="black" strokeWidth="3" strokeLinecap="round"/>
            <line x1="2" y1="9" x2="18" y2="9" stroke="black" strokeWidth="3" strokeLinecap="round"/>
            <line x1="2" y1="3" x2="18" y2="3" stroke="black" strokeWidth="3" strokeLinecap="round"/>
        </svg>
    );
};

export const Liked = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 17.925" fill="none">
            <path
                d="M9.29334 2.42109L10 3.12684L10.7067 2.42109C12.6039 0.526302 15.6804 0.526302 17.5776 2.42109C19.4741 4.31518 19.4741 7.38556 17.5776 9.27964L10 16.8476L2.42238 9.27964C0.525872 7.38556 0.525872 4.31518 2.42238 2.42109C4.3196 0.526302 7.39613 0.526302 9.29334 2.42109Z"
                strokeWidth="2"/>
        </svg>
    );
};

export const Search = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path strokeWidth="2"
                  d="M19.0014 9.00071C19.0014 13.4194 15.4194 17.0014 11.0007 17.0014C6.58204 17.0014 3 13.4194 3 9.00071C3 4.58204 6.58204 1 11.0007 1C15.4194 1 19.0014 4.58204 19.0014 9.00071Z"/>
            <path d="M1 19L5 15" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    );
};

export const Plus = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 1V10M10 10V19M10 10H1M10 10H19" strokeWidth="2"
                  strokeLinecap="round"/>
        </svg>
    );
};

export const Work = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 5C6 2.5 8 1 10 1C12 1 14 2.5 14 5" strokeWidth="2" strokeLinecap="round"/>
            <path d="M18 6H2C1.44772 6 1 6.44772 1 7V18C1 18.5523 1.44772 19 2 19H18C18.5523 19 19 18.5523 19 18V7C19 6.44772 18.5523 6 18 6Z" strokeWidth="2"/>
        </svg>
    );
};

export const Exit = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                stroke="#C9CED6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17L21 12L16 7" stroke="#C9CED6" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M21 12H9" stroke="#C9CED6" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    );
};

export const Edit = (props: { onClick: () => void }) => {
    return (
        <svg className={classes.Clickable} onClick={props.onClick} width="19" height="19" viewBox="0 0 19 19"
             fill="none">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M17.2071 6.25174C17.9814 5.47745 18.1599 4.49514 17.9806 3.59852C17.8083 2.73683 17.312 1.94242 16.7071 1.33753C16.1023 0.73264 15.3078 0.236395 14.4462 0.0640563C13.5495 -0.115268 12.5672 0.0632375 11.7929 0.837529L2.29293 10.3375C2.18315 10.4473 2.10044 10.5811 2.05135 10.7284L0.0513546 16.7284C-0.068425 17.0877 0.025098 17.4839 0.292932 17.7517C0.560764 18.0196 0.956931 18.1131 1.31627 17.9933L7.31627 15.9933C7.46355 15.9442 7.59737 15.8615 7.70715 15.7517L17.2071 6.25174ZM13.2071 2.25174C13.4329 2.02603 13.7005 1.95454 14.0539 2.02522C14.4422 2.10288 14.8978 2.35664 15.2929 2.75174C15.688 3.14685 15.9418 3.60245 16.0195 3.99075C16.0901 4.34414 16.0186 4.61182 15.7929 4.83753L15 5.63043L12.4143 3.04464L13.2071 2.25174ZM11 4.45885L3.87407 11.5848L2.58118 15.4635L6.45986 14.1706L13.5858 7.04464L11 4.45885Z"
                  fill="#000000"/>
        </svg>
    );
};

export const Close = (props: { onClick: () => void }) => {
    return (
        <svg className={classes.Clickable} onClick={props.onClick} width="14" height="14" viewBox="0 0 14 14"
             fill="none">
            <path d="M1 1L7 7M7 7L13 13M7 7L13 1M7 7L1 13" stroke="#000000" strokeWidth="2"
                  strokeLinecap="round"/>
        </svg>
    );
};

export const Open = (props: { onClick: () => void }) => {
    return (
        <svg className={classes.Clickable} onClick={props.onClick} width="18" height="18" viewBox="0 0 18 18"
             fill="none">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9ZM18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM10 6C10 5.44772 9.55228 5 9 5C8.44772 5 8 5.44772 8 6V8H6C5.44772 8 5 8.44772 5 9C5 9.55228 5.44772 10 6 10H8V12C8 12.5523 8.44772 13 9 13C9.55228 13 10 12.5523 10 12V10H12C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8H10V6Z"
                  fill="#000000"/>
        </svg>
    );
};

export const Delete = (props: { onClick: () => void }) => {
    return (
        <svg className={classes.Clickable} onClick={props.onClick} width="14" height="18" viewBox="0 0 14 18"
             fill="none">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M6.44152 0C5.15023 0 4.00381 0.82629 3.59547 2.05132L3.27924 3H2H1C0.447715 3 0 3.44772 0 4C0 4.55228 0.447715 5 1 5V17C1 17.5523 1.44772 18 2 18H12C12.5523 18 13 17.5523 13 17V5C13.5523 5 14 4.55228 14 4C14 3.44772 13.5523 3 13 3H12H10.7208L10.4045 2.05132C9.99619 0.82629 8.84977 0 7.55848 0H6.44152ZM11 5H10H4H3V16H11V5ZM8.61257 3L8.50716 2.68377C8.37105 2.27543 7.98891 2 7.55848 2H6.44152C6.01109 2 5.62895 2.27543 5.49284 2.68377L5.38743 3H8.61257Z"
                  fill="#000000"/>
        </svg>
    );
};

export const Back = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 16 12" fill="none">
            <path d="M15 6H1M1 6L6.25 1M1 6L6.25 11" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    );
};

export const OpenEye = (props: { onClick: () => void }) => {
    return (
        <svg className={classes.Clickable} onClick={props.onClick} width="18" height="12" viewBox="0 0 18 12"
             fill="none">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M4.79532 8.25603C3.73281 7.46285 2.85592 6.58003 2.32434 6C2.85592 5.41997 3.73281 4.53715 4.79532 3.74397C6.13186 2.74623 7.61732 2 9 2C10.3827 2 11.8681 2.74623 13.2047 3.74397C14.2672 4.53715 15.1441 5.41997 15.6757 6C15.1441 6.58003 14.2672 7.46285 13.2047 8.25603C11.8681 9.25377 10.3827 10 9 10C7.61732 10 6.13186 9.25377 4.79532 8.25603ZM9 0C6.96407 0 5.04591 1.06108 3.5989 2.1413C2.12625 3.24065 0.991137 4.47419 0.498794 5.04227C0.0205028 5.59414 0.0205028 6.40586 0.498794 6.95773C0.991137 7.52581 2.12625 8.75935 3.5989 9.8587C5.04591 10.9389 6.96407 12 9 12C11.0359 12 12.9541 10.9389 14.4011 9.8587C15.8737 8.75935 17.0089 7.52581 17.5012 6.95773C17.9795 6.40586 17.9795 5.59414 17.5012 5.04227C17.0089 4.47419 15.8737 3.24065 14.4011 2.1413C12.9541 1.06108 11.0359 0 9 0ZM9 8C10.1046 8 11 7.10457 11 6C11 4.89543 10.1046 4 9 4C7.89543 4 7 4.89543 7 6C7 7.10457 7.89543 8 9 8Z"
                  fill="#000000"/>
        </svg>
    );
};

export const CloseEye = (props: { onClick: () => void }) => {
    return (
        <svg className={classes.Clickable} onClick={props.onClick} width="18" height="17" viewBox="0 0 18 17"
             fill="none">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M1.36827 14.3033C0.977747 14.6938 0.977747 15.327 1.36827 15.7175C1.75778 16.107 2.38866 16.108 2.77943 15.7206C2.78045 15.7195 2.78147 15.7185 2.78249 15.7175L4.8194 13.6806L6.28644 12.2135L7.85791 10.6421L10.6421 7.85791L12.3462 6.1538L13.7916 4.70838L16.2175 2.28249C16.2185 2.28146 16.2196 2.28043 16.2206 2.2794C16.608 1.88863 16.607 1.25777 16.2175 0.868272C15.827 0.477748 15.1938 0.477747 14.8033 0.868272L11.9801 3.69148C11.0488 3.27676 10.0398 3 9 3C6.96407 3 5.04591 4.06108 3.5989 5.1413C2.12625 6.24065 0.991137 7.47419 0.498794 8.04227C0.0205028 8.59414 0.0205028 9.40586 0.498794 9.95773C0.940494 10.4674 1.89953 11.5126 3.1555 12.5161L1.36827 14.3033ZM14.7399 6.58853C14.7387 6.58974 14.7374 6.59095 14.7362 6.59217C14.735 6.59339 14.7338 6.59462 14.7326 6.59584C14.3249 7.00767 14.355 7.67895 14.7744 8.07989C15.1339 8.42352 15.439 8.74177 15.6757 9C15.1441 9.58003 14.2672 10.4629 13.2047 11.256C11.8681 12.2538 10.3827 13 9 13C8.95955 13 8.91902 12.9994 8.8784 12.9981C8.56304 12.9883 8.24748 13.0833 8.02337 13.305C8.02215 13.3063 8.02093 13.3075 8.01971 13.3087L7.86315 13.4652C7.86191 13.4665 7.86067 13.4677 7.85944 13.469C7.34256 13.991 7.55384 14.8713 8.28468 14.9574C8.52109 14.9852 8.75972 15 9 15C11.0359 15 12.9541 13.9389 14.4011 12.8587C15.8737 11.7594 17.0089 10.5258 17.5012 9.95773C17.9795 9.40586 17.9795 8.59414 17.5012 8.04227C17.2188 7.71638 16.7248 7.17148 16.0769 6.55855C15.6992 6.20122 15.109 6.22314 14.7399 6.58853ZM7.03248 8.63909C7.18105 7.82386 7.82386 7.18105 8.63909 7.03248L10.4331 5.23842C9.95015 5.08592 9.46916 5 9 5C7.61732 5 6.13186 5.74623 4.79532 6.74398C3.73281 7.53715 2.85592 8.41997 2.32434 9C2.81951 9.5403 3.61431 10.3433 4.57966 11.0919L7.03248 8.63909Z"
                  fill="#000000"/>
        </svg>
    );
};
