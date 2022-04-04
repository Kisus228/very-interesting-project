import React, { useState } from "react";
// @ts-ignore
import classes from "./Filter.less";
import FilterCheckbox from "./FilterCheckbox";

// TODO: Сергей Кашкин | Верстка, логика: Подумать, как реализовать фильтр

export type FilterType = {
    label: string;
    payload: FilterType[];
    isChecked: boolean;
};

const Filter = () => {
    const defaultState: FilterType[] = [
        {
            label: "Front-end",
            payload: [
                {
                    label: "JavaScript",
                    payload: [
                        {
                            label: "Junior",
                            payload: [],
                            isChecked: false,
                        },
                        {
                            label: "Middle",
                            payload: [],
                            isChecked: false,
                        },
                        {
                            label: "Senior",
                            payload: [],
                            isChecked: false,
                        },
                    ],
                    isChecked: false,
                },
                {
                    label: "React",
                    payload: [
                        {
                            label: "Junior",
                            payload: [],
                            isChecked: false,
                        },
                        {
                            label: "Middle",
                            payload: [],
                            isChecked: false,
                        },
                        {
                            label: "Senior",
                            payload: [],
                            isChecked: false,
                        },
                    ],
                    isChecked: false,
                },
                {
                    label: "Angular",
                    payload: [
                        {
                            label: "Junior",
                            payload: [],
                            isChecked: false,
                        },
                        {
                            label: "Middle",
                            payload: [],
                            isChecked: false,
                        },
                        {
                            label: "Senior",
                            payload: [],
                            isChecked: false,
                        },
                    ],
                    isChecked: false,
                },
                {
                    label: "HTML",
                    payload: [],
                    isChecked: false,
                },
                {
                    label: "CSS",
                    payload: [],
                    isChecked: false,
                },
            ],
            isChecked: false,
        },
        {
            label: "Back-end",
            payload: [],
            isChecked: false,
        },
        {
            label: "UI / UX",
            payload: [],
            isChecked: false,
        },
        {
            label: "Аналитик",
            payload: [
                {
                    label: "Junior",
                    payload: [],
                    isChecked: false,
                },
                {
                    label: "Middle",
                    payload: [],
                    isChecked: false,
                },
                {
                    label: "Senior",
                    payload: [],
                    isChecked: false,
                },
            ],
            isChecked: false,
        },
    ];

    const [filterState, setFilterState] = useState<FilterType[]>(defaultState);

    function onSubmitClick(): void {
        console.log(JSON.stringify(filterChecked(filterState)));
    }

    function filterChecked(arrayToFilter: FilterType[]): FilterType[] {
        return arrayToFilter
            .filter((elem) => elem.isChecked)
            .map((elem) => {
                return { ...elem, ...{ payload: filterChecked(elem.payload) } };
            });
    }

    return (
        <div className={classes.Filter}>
            <h3>Фильтр</h3>
            <FilterCheckbox
                items={filterState}
                setFilterState={setFilterState}
                labels={[]}
            />
            <button onClick={() => onSubmitClick()}>Ты пидор!</button>
        </div>
    );
};

export default Filter;
