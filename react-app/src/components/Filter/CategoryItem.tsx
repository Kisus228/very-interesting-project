import React from "react";
import {FilterType, onChangeFilterType} from "./Filter";
import CompetenceItem from "./CompetenceItem";

type PropsType = {
    item: FilterType,
    onChangeFilter: onChangeFilterType,
};

const CategoryItem: React.FC<PropsType> = (props) => {
    return (
        <li>
            <h4>{props.item.category}</h4>
            <ul>
                {
                    props.item.competencies.map(item => {
                        return <CompetenceItem key={item.id} item={item} onChangeFilter={props.onChangeFilter}/>
                    })
                }
            </ul>
        </li>
    );
}

export default CategoryItem;