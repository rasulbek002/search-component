import React, { useEffect, useMemo, useRef, useState } from "react";
import locationIcon from "../../assets/location.svg";
import useOutsideClick from "../hooks/useOutsideClick";

export default function SelectCity({
  setCityFilter,
  cityFilter,
  cities,
  errors,
  setErrors,
}) {
  const [showFromCities, setShowFromCities] = useState(false);
  const [showWhereCities, setShowWhereCities] = useState(false);

  const ref = useRef();

  const cachedCities = useMemo(() => {
    return cities;
  }, [cities]);

  useOutsideClick(ref, () => {
    setShowFromCities(false);
    setShowWhereCities(false);
  });

  useEffect(() => {
    if (cityFilter.from) {
      setErrors((prev) => {
        return prev.filter((item) => item !== "fromRequired");
      });
    }

    if (cityFilter.where) {
      setErrors((prev) => {
        return prev.filter((item) => item !== "whereRequired");
      });
    }
  }, [cityFilter]);

  function handleSelectCity(value) {
    if (showFromCities) {
      setCityFilter((prev) => {
        return {
          ...prev,
          from: value,
        };
      });
    } else {
      setCityFilter((prev) => {
        return {
          ...prev,
          where: value,
        };
      });
    }
  }

  return (
    <div ref={ref} className=" relative">
      <div className=" flex gap-5">
        <div className=" relative">
          <h3 className=" absolute bottom-[100%] text-[14px] font-medium  mb-2">
            Откуда
          </h3>
          <div className=" relative">
            <div
              onClick={() => {
                setShowFromCities(true);
                setShowWhereCities(false);
              }}
              className={`cursor-pointer  flex rounded-[5px] gap-2 py-[12px] px-[18px] ${
                showFromCities ? "bg-mainBg" : "bg-actionsColor"
              } `}
            >
              <img src={locationIcon} alt="" />
              <div>{cityFilter?.from || "Выберите город"}</div>
            </div>
            <p className=" absolute bottom-[-100%] text-[red]">
              {errors?.includes("fromRequired") && "Выберите город, пожалуйста"}
            </p>
          </div>
        </div>
        <div className=" relative">
          <h3 className=" absolute bottom-[100%] text-[14px] font-medium  mb-2">
            Куда
          </h3>
          <div
            onClick={() => {
              setShowWhereCities(true);
              setShowFromCities(false);
            }}
            className={`cursor-pointer  flex rounded-[5px] gap-2 py-[12px] px-[18px] ${
              showWhereCities ? "bg-mainBg" : "bg-actionsColor"
            } `}
          >
            <img src={locationIcon} alt="" />
            <div>{cityFilter?.where || "Выберите город"}</div>
          </div>
          <p className=" absolute bottom-[-100%] text-[red]">
            {errors?.includes("whereRequired") && "Выберите город, пожалуйста"}
          </p>
        </div>
      </div>
      <div
        className={`${
          showFromCities || showWhereCities ? "scale-100" : "scale-0"
        } absolute bg-mainBg rounded-[5px] left-0 right-0 top-[150%]`}
      >
        <div className="relative max-h-[222px] overflow-y-auto ">
          <div
            className={`absolute ${
              showFromCities ? "left-4" : "right-4"
            } bottom-[99%]`}
          ></div>
          <div className="">
            {(setShowFromCities || setShowWhereCities) &&
              cachedCities?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" cursor-pointer text-[14px] p-3 hover:bg-actionsColor"
                    onClick={() => handleSelectCity(item)}
                  >
                    {item}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
