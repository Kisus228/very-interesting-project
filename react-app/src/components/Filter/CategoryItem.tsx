import React, {useState} from "react";
import {FilterType, onChangeFilterType} from "./Filter";
import CompetenceItem from "./CompetenceItem";

type PropsType = {
    item: FilterType,
    onChangeFilter: onChangeFilterType,
};

const CategoryItem: React.FC<PropsType> = (props) => {
    const [dropdown, setDropdown] = useState(false);

    return (
        <li>
            <h4 onClick={() => setDropdown(!dropdown)}>{props.item.category}</h4>
            <ul>
                {
                    props.item.competencies.map(item => {
                        return <CompetenceItem key={item.id} item={item} dropdown={dropdown}
                                               onChangeFilter={props.onChangeFilter}/>
                    })
                }
            </ul>
        </li>
    );
}

export default CategoryItem;