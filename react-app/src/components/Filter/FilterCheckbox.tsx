import React, { useState } from "react";
// @ts-ignore
import classes from "./Filter.less";
import { FilterType } from "./Filter";

type FilterCheckboxProps = {
  items: FilterType[];
  setFilterState: (xyi: (pizda: FilterType[]) => FilterType[]) => void;
  labels: number[];
};

const FilterCheckbox = ({
  items,
  setFilterState,
  labels,
}: FilterCheckboxProps) => {
  return (
    <ul>
      {items.map((item, index) => {
        const newLabels: number[] = JSON.parse(JSON.stringify(labels));
        newLabels.push(index);
        return (
          <li key={item.label + index}>
            <label>
              <input
                type={"checkbox"}
                onChange={(e) => {
                  const value = e.target.checked;

                  setFilterState((prev) => {
                    const newValue: FilterType[] = JSON.parse(
                      JSON.stringify(prev)
                    );

                    const searchPoint: FilterType[] = labels.reduce(
                      (previousValue, currentValue) =>
                        previousValue[currentValue].payload,
                      newValue
                    );
                    const labelToChange = searchPoint[index];
                    if (labelToChange) labelToChange.isChecked = value;
                    else console.log("Ещё не доделал");

                    return newValue;
                  });
                }}
                checked={items[index].isChecked}
              />
              {item.label}
            </label>
            {item.payload.length !== 0 && items[index].isChecked && (
              <FilterCheckbox
                items={item.payload}
                setFilterState={setFilterState}
                labels={newLabels}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default FilterCheckbox;
