import React, {useState} from "react";
import {onChangeFilterType} from "./Filter";
import CompetenceItem from "./CompetenceItem";
import classes from './Filter.less';
import {Arrow} from "../Common/Icons/Icons";
import cn from "classnames";
import {FilterType} from "../../types/types";

type PropsType = {
    item: FilterType,
    onChangeFilter: onChangeFilterType,
};

const CategoryItem: React.FC<PropsType> = (props) => {
    const [dropdown, setDropdown] = useState(false);

    return (
        <li>
            <div className={classes.DropdownButtonWrapper}>
                <div className={classes.DropdownButton} onClick={() => setDropdown(!dropdown)}>
                    <h4>{props.item.category}</h4>
                    <div className={cn(classes.SvgContainer, {[classes.DropdownOpened]: dropdown})}>
                        <Arrow color={"#000000"}/>
                    </div>
                </div>
            </div>
            <ul>
                {
                    props.item.skills.map(item => {
                        return <CompetenceItem key={item.id} item={item} dropdown={dropdown}
                                               onChangeFilter={props.onChangeFilter}/>
                    })
                }
            </ul>
        </li>
    );
}

export default CategoryItem;