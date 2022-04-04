import React, {useState} from 'react';
// @ts-ignore
import classes from './Filter.less';
import {FilterType} from "./Filter";

const FilterCheckbox = (props: {items: FilterType[]}) => {
    return (
        <ul>
            {
                props.items.map((item, index) => {
                    return (
                        <li key={item.label + index}>
                            <label>
                                <input type={'checkbox'} />{item.label}
                            </label>
                            {item.payload.length !== 0 && <FilterCheckbox items={item.payload}/>}
                        </li>
                    )
                })
            }
        </ul>
    );
};

export default FilterCheckbox;