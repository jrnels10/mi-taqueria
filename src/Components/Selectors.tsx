import { useState, useEffect } from "react";
import { titleCase } from "../Utils/tools";
import "./Selectors.scss";
import { ISchedule } from "../Utils/Interfaces";

const days = {
  sunday: false,
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
};
const color = {
  red: false,
  green: true,
  blue: false,
};
export const DaySelector = (props: any) => {
  const {
    callBack = () => null,
    propsDays = days,
    customClassName = "",
    readOnly = false,
  } = props;
  const [daysSelected, setdaysSelected] = useState<ISchedule>(
    propsDays ? propsDays : days
  );
  const selectDay = (day: any) => {
    const dayKey: keyof ISchedule = day;
    const newDays = { ...daysSelected, ...{ [day]: !daysSelected[dayKey] } };
    setdaysSelected(newDays);
    callBack(newDays);
  };
  useEffect(() => {
    if (propsDays) {
      return setdaysSelected(propsDays);
    }
  }, [propsDays]);
  return (
    <div className="daysOfOperation_container">
      <ul className={`daysOfOperation ${customClassName}`}>
        <li
          className={`day_${daysSelected.sunday}`}
          onClick={() => (!readOnly ? selectDay("sunday") : null)}
        >
          <span>Su</span>
        </li>
        <li
          className={`day_${daysSelected.monday}`}
          onClick={() => (!readOnly ? selectDay("monday") : null)}
        >
          <span>Mo</span>
        </li>
        <li
          className={`day_${daysSelected.tuesday}`}
          onClick={() => (!readOnly ? selectDay("tuesday") : null)}
        >
          <span>Tu</span>
        </li>
        <li
          className={`day_${daysSelected.wednesday}`}
          onClick={() => (!readOnly ? selectDay("wednesday") : null)}
        >
          <span>We</span>
        </li>
        <li
          className={`day_${daysSelected.thursday}`}
          onClick={() => (!readOnly ? selectDay("thursday") : null)}
        >
          <span>Th</span>
        </li>
        <li
          className={`day_${daysSelected.friday}`}
          onClick={() => (!readOnly ? selectDay("friday") : null)}
        >
          <span>Fr</span>
        </li>
        <li
          className={`day_${daysSelected.saturday}`}
          onClick={() => (!readOnly ? selectDay("saturday") : null)}
        >
          <span>Sa</span>
        </li>
      </ul>
    </div>
  );
};
