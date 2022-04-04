import React, {useState} from 'react';
// @ts-ignore
import classes from './Filter.less';
import FilterCheckbox from "./FilterCheckbox";

// TODO: Сергей Кашкин | Верстка, логика: Подумать, как реализовать фильтр

export type FilterType = {
    label: string,
    payload: FilterType[],
}

const Filter = () => {
    const [state] = useState([
        {
            label: "Front-end",
            payload: [
                {
                    label: "JavaScript",
                    payload: [
                        {
                            label: "Junior",
                            payload: [],
                        },
                        {
                            label: "Middle",
                            payload: [],
                        },
                        {
                            label: "Senior",
                            payload: [],
                        }
                    ],
                },
                {
                    label: "React",
                    payload: [
                        {
                            label: "Junior",
                            payload: [],
                        },
                        {
                            label: "Middle",
                            payload: [],
                        },
                        {
                            label: "Senior",
                            payload: [],
                        }
                    ],
                },
                {
                    label: "Angular",
                    payload: [
                        {
                            label: "Junior",
                            payload: [],
                        },
                        {
                            label: "Middle",
                            payload: [],
                        },
                        {
                            label: "Senior",
                            payload: [],
                        }
                    ],
                },
                {
                    label: "HTML",
                    payload: [],
                },
                {
                    label: "CSS",
                    payload: [],
                },
            ]
        },
        {
            label: "Back-end",
            payload: [],
        },
        {
            label: "UI / UX",
            payload: [],
        },
        {
            label: "Аналитик",
            payload: [
                {
                    label: "Junior",
                    payload: [],
                },
                {
                    label: "Middle",
                    payload: [],
                },
                {
                    label: "Senior",
                    payload: [],
                }
            ],
        },
    ] as FilterType[])

    return (
        <div className={classes.Filter}>
            <h3>Фильтр</h3>
            <FilterCheckbox items={state}/>
        </div>
    );
};

export default Filter;