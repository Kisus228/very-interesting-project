import React from "react";
import {onChangeFilterType} from "./Filter";
import classes from './Filter.less';
import {CompetenceType} from "../../types/types";
import cn from "classnames";

type PropsType = {
    item: CompetenceType,
    dropdown: boolean,
    onChangeFilter: onChangeFilterType,
};

const CompetenceItem: React.FC<PropsType> = (props) => {
    return (
        <li className={cn(classes.Animation, {[classes.Closed]: !props.dropdown})}>
            <label>
                <input type={"checkbox"} onChange={
                    (e) => props.onChangeFilter(e.target.checked, props.item.id)
                }/>{props.item.name}
            </label>
        </li>
    );
}

export default CompetenceItem;
