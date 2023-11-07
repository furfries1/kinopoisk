import React, { useState, useEffect } from "react";
import FilterIcon from "src/icons/filter.svg";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { GET_FILTER_ID } from "src/actions/actions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const FilterMenu = () => {
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const filterGenres = useSelector(({ pages }) => pages.filterGenres);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const onFilterClick = () => {
    setIsFilterOpen((prevState) => !prevState);
    if (filterGenres.length === 0) {
      dispatch(GET_FILTER_ID());
    }
  };

  return (
    <>
      <div className="filter-icon" onClick={() => onFilterClick()}>
        <img src={FilterIcon} alt="filter" />
      </div>
      <Filter isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />
    </>
  );
};

export default FilterMenu;
