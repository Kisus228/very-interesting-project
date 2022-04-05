import React from "react";
import {CompetenceType, onChangeFilterType} from "./Filter";

type PropsType = {
    item: CompetenceType,
    onChangeFilter: onChangeFilterType,
};

const CompetenceItem: React.FC<PropsType> = (props) => {
    return (
        <li>
            <label>
                <input type={"checkbox"} onChange={
                    (e) => props.onChangeFilter(e.target.checked, props.item.id)
                }/>{props.item.name}
            </label>
        </li>
    );
}

export default CompetenceItem;