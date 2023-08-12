import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getNextDay } from "../helper";
import Button from "../ui/Button";
import Rectangle from "../ui/Rectangle";
import "./style.css";

function DateRangePicker({ setDateFilter, dateFilter, setIsdatePickerOpen }) {
  function handleWithoutEndDate(e) {
    if (e.target.checked) {
      setDateFilter((prev) => {
        return { ...prev, endDate: null };
      });
    } else {
      setDateFilter((prev) => {
        return { ...prev, endDate: getNextDay(new Date()) };
      });
    }
  }

  return (
    <div className=" relative py-11 px-[54px] bg-mainBg rounded-[5px] w-[801px] ">
      <div className=" absolute top-[-10px] left-3">
        <Rectangle />
      </div>
      <div>
        <div className="flex gap-[87px] pb-8">
          <div key="startDate" className="calendar-container">
            <Calendar
              locale="ru"
              onChange={(date) =>
                setDateFilter((prev) => {
                  return {
                    ...prev,
                    startDate: date,
                  };
                })
              }
              value={dateFilter.startDate}
              minDate={new Date()}
            />
          </div>
          <div key="endDate" className="calendar-container">
            <Calendar
              locale="ru"
              onChange={(date) =>
                setDateFilter((prev) => {
                  return {
                    ...prev,
                    endDate: date,
                  };
                })
              }
              value={dateFilter.endDate}
              minDate={dateFilter.startDate}
            />
          </div>
        </div>
        <div className=" h-[1px] bg-borderColor mb-[29px]"></div>
        <div className=" flex justify-between align items-center">
          <label className=" cursor-pointer flex gap-2 items-center text-[13px] text-main  ">
            <input
              onChange={handleWithoutEndDate}
              className=" checked:bg-main"
              checked={!dateFilter.endDate ? true : false}
              type="checkbox"
            />
            Без конечной даты
          </label>
          <Button onClick={() => setIsdatePickerOpen(false)} styles="bg-main">
            Готово
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DateRangePicker;
