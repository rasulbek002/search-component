import React, { useRef, useState } from "react";
import DateRangePicker from "../dateRangePicker/DateRangePicker";
import PickButton, {
  formatDateToRussianText,
} from "../dateRangePicker/PickButton";
import { getNextDay } from "../helper";
import useOutsideClick from "../hooks/useOutsideClick";
import SelectCity from "../selectCity/SelectCity";
import Button from "../ui/Button";

export default function CustomSearch({ cities, onSearch }) {
  const [isDatePickerOpen, setIsdatePickerOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    startDate: new Date(),
    endDate: getNextDay(new Date()),
  });
  const [cityFilter, setCityFilter] = useState({
    from: null,
    where: null,
  });

  const ref = useRef();

  useOutsideClick(ref, () => {
    setIsdatePickerOpen(false);
  });

  function handleValidationAndSearch() {
    let isError = false;
    const filters = {
      city: cityFilter,
      date: {
        startDate: formatDateToRussianText(dateFilter.startDate),
        endDate: formatDateToRussianText(dateFilter.endDate),
      },
    };

    if (!filters.city.from) {
      setErrors((prev) => {
        return [...prev, "fromRequired"];
      });

      isError = true;
    }

    if (!filters.city.where) {
      setErrors((prev) => {
        return [...prev, "whereRequired"];
      });

      isError = true;
    }

    if (!isError) {
      onSearch(filters);
    }
  }

  return (
    <div className=" inline-flex  gap-5 items-center bg-[white] p-11 ">
      <SelectCity
        setCityFilter={setCityFilter}
        cityFilter={cityFilter}
        cities={cities}
        errors={errors}
        setErrors={setErrors}
      />
      <div className=" relative">
        <PickButton
          setIsdatePickerOpen={setIsdatePickerOpen}
          startDate={dateFilter.startDate}
          endDate={dateFilter.endDate}
        />
        <div
          ref={ref}
          className={` absolute top-[150%] left-0 transition-all duration-500 origin-center ${
            isDatePickerOpen ? "scale-100" : "scale-0"
          }`}
        >
          {isDatePickerOpen && (
            <DateRangePicker
              setDateFilter={setDateFilter}
              dateFilter={dateFilter}
              setIsdatePickerOpen={setIsdatePickerOpen}
            />
          )}
        </div>
      </div>
      <div>
        <Button onClick={handleValidationAndSearch} styles="bg-main">
          Найти
        </Button>
      </div>
    </div>
  );
}
