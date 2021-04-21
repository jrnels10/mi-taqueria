import { useState, useEffect } from "react";
import { titleCase } from "../Utils/tools";
import "./Selectors.scss";

export const DaySelector = (props: any) => {
  const { callBack = () => null, propsDays = [], customClassName = "" } = props;
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const [daysSelected, setdaysSelected] = useState<string[]>(propsDays);
  const selectDay = (name: string) => {
    const found = daysSelected.find((s: string) => s === name);
    let days = daysSelected;
    if (found) {
      days = [...daysSelected.filter((f) => f !== name)];
    } else {
      days = [...daysSelected, name];
    }
    setdaysSelected(days);
    callBack(days);
  };

  useEffect(() => {
    return setdaysSelected(propsDays);
  }, [propsDays]);
  return (
    <ul className={`daysOfOperation ${customClassName}`}>
      {days.map((d: string) => {
        return (
          <li
            key={d}
            className={`day_${daysSelected.includes(d)}`}
            onClick={() => selectDay(d)}
          >
            <span>{titleCase(d.substring(0, 2))}</span>
          </li>
        );
      })}
    </ul>
  );
};
