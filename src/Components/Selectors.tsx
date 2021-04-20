import { useState } from "react";
import "./Selectors.scss";

export const DaySelector = (props: any) => {
  const { callBack = () => null, propsDays = [], customClassName = "" } = props;
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
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
  return (
    <ul className={`daysOfOperation ${customClassName}`}>
      {days.map((d: string) => (
        <li
          key={d}
          className={`day_${daysSelected.includes(d)}`}
          onClick={() => selectDay(d)}
        >
          <span>{d}</span>
        </li>
      ))}
    </ul>
  );
};
