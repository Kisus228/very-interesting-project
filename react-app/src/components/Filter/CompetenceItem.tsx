import React from "react";
import {onChangeFilterType} from "./Filter";
import classes from './Filter.less';
import {CompetenceType} from "../../types/types";

type PropsType = {
    item: CompetenceType,
    dropdown: boolean,
    onChangeFilter: onChangeFilterType,
};

const CompetenceItem: React.FC<PropsType> = (props) => {
    return (
        <li className={`${classes.Animation} ${props.dropdown ? classes.Opened : classes.Closed}`}>
            <label>
                <input type={"checkbox"} onChange={
                    (e) => props.onChangeFilter(e.target.checked, props.item.id)
                }/>{props.item.name}
            </label>
        </li>
    );
}

export default CompetenceItem;
