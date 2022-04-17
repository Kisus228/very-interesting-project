import React from 'react';
import classes from './LikeButton.less';

interface PropsType {
    liked: boolean;
    onClick: () => void;
}

const LikeButton: React.FC<PropsType> = (props) => {
    return (
        <svg className={classes.SvgContainer} onClick={props.onClick} width="25" height="25" viewBox="0 0 20 18"
             fill="none">
            <path
                d="M2.54416 2.50138C4.60303 0.499539 7.94112 0.499539 10 2.50138C12.0589 0.499539 15.397 0.499539 17.4558 2.50138C19.5147 4.50322 19.5147 7.74885 17.4558 9.75069L10.6971 16.3222C10.309 16.6996 9.69102 16.6996 9.30289 16.3222L2.54416 9.75069C0.485281 7.74885 0.485281 4.50322 2.54416 2.50138Z"
                stroke="#000000" strokeWidth="2" fill={props.liked ? "#F66A6A" : ""}/>
        </svg>
    );
};

export default LikeButton;
