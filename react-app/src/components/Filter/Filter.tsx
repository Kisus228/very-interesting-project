import React, {useState} from "react";
// @ts-ignore
import classes from "./Filter.less";
import FilterCheckbox from "./FilterCheckbox";

export type FilterType = {
    category: string;
    competencies: CompetenceType[];
};

export type CompetenceType = {
    id: number,
    name: string,
}

const onChangeFilter = (filters: number[], /*setFilters: React.Dispatch<React.SetStateAction<number[]>>, */checked: boolean, newId: number) => {
    if (checked) {
        //setFilters([...filters, newId]);
        filters.push(newId);
    } else {
        //setFilters(filters.filter(id => id !== newId));
        const index = filters.findIndex(id => id === newId);
        filters.splice(index, 1);
    }
}

const CompetenceItem = (props: { item: CompetenceType, filters: number[]/*, setFilters: React.Dispatch<React.SetStateAction<number[]>>*/}) => {
    return (
        <li>
            <label>
                <input type={"checkbox"} onChange={
                    (e) => onChangeFilter(props.filters/*, props.setFilters*/, e.target.checked, props.item.id)
                }/>{props.item.name}
            </label>
        </li>
    );
}

const CategoryItem = (props: { item: FilterType, filters: number[]/*, setFilters: React.Dispatch<React.SetStateAction<number[]>>*/}) => {
    return (
        <li>
            <h4>{props.item.category}</h4>
            <ul>
                {
                    props.item.competencies.map(item => {
                        return <CompetenceItem key={item.id} item={item} filters={props.filters}
                                               /*setFilters={props.setFilters}*//>
                    })
                }
            </ul>
        </li>
    );
}

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

    const [state, setState] = useState<FilterType[]>(defaultState);
    //const [filters, setFilters] = useState<number[]>([]);
    // Решил пока оставить мутабельный фильтр
    // TODO: Сергей Кашкин | Логика: убрать мусор из компонет.
    const filters: number[] = [];
    return (
        <div className={classes.Filter}>
            <h3>Фильтр</h3>
            <ul>
                {
                    state.map(item => <CategoryItem key={item.category} item={item} filters={filters}
                                                    /*setFilters={setFilters}*//>)
                }
            </ul>

            <button onClick={() => console.log(filters)}>Нет ты пидор!</button>
        </div>
    );
};

export default Filter;
