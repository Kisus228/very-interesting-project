import React, {useEffect} from "react";
import classes from "./Filter.less";
import CategoryItem from "./CategoryItem";
import Button from "../Common/FormControl/Button";
import {connect} from "react-redux";
import {compose} from "redux";
import {getFilterTC} from "../../redux/FilterReducer";
import {AppStateType} from "../../redux/ReduxStore";

export type onChangeFilterType = (checked: boolean, newId: number) => void;

const Filter: React.FC<Props> = (props) => {
    const filters: number[] = [];

    useEffect(() => {
        props.getFilterTC();
    }, [])

    const onChangeFilter = (checked: boolean, newId: number) => {
        if (checked) {
            filters.push(newId);
        } else {
            const index = filters.findIndex(id => id === newId);
            filters.splice(index, 1);
        }
    }

    return (
        <div className={classes.Filter}>
            <h3>Фильтр</h3>
            <ul>
                {
                    !!props.filter && props.filter.map((item: any) => <CategoryItem key={item.category} item={item} onChangeFilter={onChangeFilter}/>)
                }
            </ul>
            <div className={classes.ButtonWrapper}>
                <Button type={"button"} size={"small"} onClick={() => console.log(filters)}>Применить фильтр</Button>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        filter: state.filterData.filter,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getFilterTC: () => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {getFilterTC}))(Filter);
