import React, {useState} from "react";
import {FilterType, onChangeFilterType} from "./Filter";
import CompetenceItem from "./CompetenceItem";
import classes from './Filter.less';

type PropsType = {
    item: FilterType,
    onChangeFilter: onChangeFilterType,
};

const CategoryItem: React.FC<PropsType> = (props) => {
    const [dropdown, setDropdown] = useState(false);
    const dropdownStyle = `${classes.SvgContainer} ${dropdown && classes.DropdownOpened }`

    return (
        <li>
            <div className={classes.DropdownButtonWrapper}>
                <div className={classes.DropdownButton} onClick={() => setDropdown(!dropdown)}>
                    <h4>{props.item.category}</h4>
                    <div className={dropdownStyle}>
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                            <path d="M11 1L6 6.25L1 1" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
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