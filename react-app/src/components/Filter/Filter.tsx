import React, {useState} from "react";
import classes from "./Filter.less";
import CategoryItem from "./CategoryItem";
import Button from "../Common/FormControl/Button";

export type FilterType = {
    category: string;
    competencies: CompetenceType[];
};

export type CompetenceType = {
    id: number,
    name: string,
}

export type onChangeFilterType = (checked: boolean, newId: number) => void;

const Filter = () => {
    const defaultState = [
        {
            category: "Front-end",
            competencies: [
                {
                    id: 0,
                    name: "JavaScript",
                },
                {
                    id: 1,
                    name: "React",
                },
                {
                    id: 2,
                    name: "Angular",
                },
                {
                    id: 3,
                    name: "HTML",
                },
                {
                    id: 4,
                    name: "CSS",
                },
            ],
        },
        {
            category: "Back-end",
            competencies: [
                {
                    id: 5,
                    name: "C",
                },
                {
                    id: 6,
                    name: "C#",
                },
                {
                    id: 7,
                    name: "Java",
                },
                {
                    id: 8,
                    name: "Python",
                },
                {
                    id: 9,
                    name: "C++",
                },
            ],
        },
        {
            category: "Аналитика",
            competencies: [
                {
                    id: 10,
                    name: "Аналитик",
                },
            ],
        },
        {
            category: "UI/UX",
            competencies: [
                {
                    id: 11,
                    name: "Дизайнер",
                },
            ],
        },
    ];
    const [state] = useState<FilterType[]>(defaultState);
    const filters: number[] = [];

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
                    state.map(item => <CategoryItem key={item.category} item={item} onChangeFilter={onChangeFilter}/>)
                }
            </ul>
            <div className={classes.ButtonWrapper}>
                <Button size={"small"} onClick={() => console.log(filters)}>Применить фильтр</Button>
            </div>
        </div>
    );
};

export default Filter;
