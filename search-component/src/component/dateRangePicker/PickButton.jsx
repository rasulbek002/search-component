import React from "react";
import calendarIcon from "../../assets/calendar.svg";

export default function PickButton({
  startDate,
  endDate,
  setIsdatePickerOpen,
}) {
  const startDateRussian = formatDateToRussianText(startDate);
  const endDateRussian =
    formatDateToRussianText(endDate) || "Без конечной даты";

  return (
    <div
      onClick={() => setIsdatePickerOpen((prevValue) => !prevValue)}
      className=" text-[14px] relative cursor-pointer bg-actionsColor max-w-[386px] rounded-[5px] bg-grayLight flex justify-between u px-[44px] py-[14px] text-main"
    >
      <h3 className=" absolute left-0 top-[-53%] text-[15px] font-medium">
        Дата
      </h3>
      <div className=" flex gap-2">
        <img src={calendarIcon} alt="" />
        {startDateRussian}
      </div>
      <div className=" w-[20px] h-[1px] bg-secondaryColor"></div>
      <div className=" flex gap-2">
        <img src={calendarIcon} alt="" />
        {endDateRussian}
      </div>
    </div>
  );
}

export function formatDateToRussianText(date) {
  const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const months = [
    "1",
    "2",
    "3",
    "4",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ];

  if (!date) {
    return null;
  }

  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();

  return `${dayOfWeek} ${day}/${month}/ ${year}`;
}
