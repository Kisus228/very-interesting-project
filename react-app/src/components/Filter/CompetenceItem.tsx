import React from "react";
import {CompetenceType, onChangeFilterType} from "./Filter";
import classes from './Filter.less';

type PropsType = {
    item: CompetenceType,
    dropdown: boolean,
    onChangeFilter: onChangeFilterType,
};

const CompetenceItem: React.FC<PropsType> = (props) => {
    return (
        <li className={`${classes.animation} ${props.dropdown ? classes.opened : classes.closed}`}>
            <label>
                <input type={"checkbox"} onChange={
                    (e) => props.onChangeFilter(e.target.checked, props.item.id)
                }/>{props.item.name}
            </label>
        </li>
    );
}

export default CompetenceItem;