import React from "react";
import classes from "./Filter.less";
import CategoryItem from "./CategoryItem";
import Button from "../Common/FormControl/Button";
import {FilterType} from "../../types/types";

export type onChangeFilterType = (checked: boolean, newId: number) => void;

interface Props {
    filter: FilterType[]
    selectedFilter: number[]
    setFilter: () => void
}

const Filter: React.FC<Props> = (props) => {
    const onChangeFilter = (checked: boolean, newId: number) => {
        if (checked) {
            props.selectedFilter.push(newId);
        } else {
            const index = props.selectedFilter.findIndex(id => id === newId);
            props.selectedFilter.splice(index, 1);
        }
    }

    return (
        <div className={classes.Filter}>
            <h3>Фильтр</h3>
            <ul>
                {
                    !!props.filter && props.filter.map((item: any) => <CategoryItem key={item.category} item={item}
                                                                                    onChangeFilter={onChangeFilter}/>)
                }
            </ul>
            <div className={classes.ButtonWrapper}>
                <Button type={"button"} size={"small"} onClick={props.setFilter}>
                    Применить фильтр
                </Button>
            </div>
        </div>
    );
};

export default React.memo(Filter);
