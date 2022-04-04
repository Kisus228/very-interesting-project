// @ts-ignore
import classes from './Search.less';
import React from 'react';
import Filter from "../Filter/Filter";

const Search = () => {

    return (
        <div className={classes.SearchWrapper}>
            <Filter />
            <div></div>
        </div>
    );
};

export default Search;