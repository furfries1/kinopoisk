import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "src/hooks/useOutsideClick";
import { IFilterMenu } from "src/interfaces/interfaces";
import "./style.scss";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import Select from "react-select";
import { filterType, sortByArr } from "src/helpers";
import { GET_FILTERED_MOVIES } from "src/actions/actions";

const Filter: FC<IFilterMenu> = ({ isFilterOpen, setIsFilterOpen }) => {
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const navigate = useNavigate();
  const [genre, setGenre] = useState(0);
  const [type, setType] = useState("ALL");
  const [ratingMin, setRatingMin] = useState(1);
  const [ratingMax, setRatingMax] = useState(10);
  const [yearMin, setYearMin] = useState(1900);
  const [yearMax, setYearMax] = useState(2023);
  const [country, setCountry] = useState(0);
  const [sortBy, setSortBy] = useState("RATING");
  const [keyword, setKeyword] = useState("");
  const theme = useSelector(({ ui }) => ui.theme);
  const filterGenres = useSelector(({ pages }) => pages.filterGenres);
  const filterCountries = useSelector(({ pages }) => pages.filterCountries);
  const currentPageFilter = useSelector(({ pages }) => pages.currentPageFilter);
  const filterRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(filterRef, () => {
    if (isFilterOpen) {
      setTimeout(() => setIsFilterOpen(false), 250);
    }
  });
  const onGenreChange = (newValue: any) => {
    newValue && setGenre(newValue.value);
  };
  const onCountryChange = (newValue: any) => {
    newValue && setCountry(newValue.value);
  };
  const onSortChange = (newValue: any) => {
    newValue && setSortBy(newValue.value);
  };
  const onTypeChange = (newValue: any) => {
    newValue && setType(newValue.value);
  };
  const onRatingMinChange = (e: any) => {
    setRatingMin(e);
  };
  const onRatingMaxChange = (e: any) => {
    setRatingMax(e);
  };
  const onYearMinChange = (e: any) => {
    setYearMin(e);
  };
  const onYearMaxChange = (e: any) => {
    setYearMax(e);
  };
  const onSearchClick = () => {
    const filterParams = {
      country,
      genre,
      sortBy,
      type,
      ratingMin,
      ratingMax,
      yearMin,
      yearMax,
      keyword,
    };
    dispatch({ type: "SET_FILTER_PARAMS", payload: filterParams });
    dispatch(
      GET_FILTERED_MOVIES(
        country,
        genre,
        sortBy,
        type,
        ratingMin,
        ratingMax,
        yearMin,
        yearMax,
        keyword,
        1
      )
    );
    navigate("/filteredMovies");
  };
  const clearFilterState = () => {
    setGenre(0);
    setType("");
    setRatingMin(1);
    setRatingMax(10);
    setYearMin(1900);
    setYearMax(2023);
    setCountry(0);
    setSortBy("");
    setKeyword("");
  };
  const getValue = (elem: any, arr: any) => {
    return elem ? arr.find((e: any) => e.value === elem) : "";
  };
  return (
    <div
      className={`filter-menu ${isFilterOpen ? "" : "hidden"} ${
        theme === "light" ? "light" : ""
      }`}
      ref={filterRef}
    >
      <h2>Фильтры:</h2>
      <div className="filter-keyword">
        <p>сортировка:</p>
        <Select
          options={sortByArr}
          onChange={onSortChange}
          placeholder="выберите параметр..."
          value={getValue(sortBy, sortByArr)}
        />
      </div>
      <div className="dropdown">
        <span>тип:</span>
        <Select
          classNamePrefix="custom-select"
          options={filterType}
          onChange={onTypeChange}
          value={getValue(type, filterType)}
          placeholder="выберите тип..."
        />
      </div>
      <div className="filter-keyword">
        <p> ключевое слово:</p>
        <input
          type="text"
          id="keyword"
          placeholder="введите ключевое слово..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="dropdown">
        <span>жанр:</span>
        <Select
          classNamePrefix="custom-select"
          options={filterGenres}
          onChange={onGenreChange}
          value={getValue(genre, filterGenres)}
          placeholder="выберите жанр..."
        />
      </div>
      <div className="dropdown">
        <span>страна:</span>
        <Select
          classNamePrefix="custom-select"
          options={filterCountries}
          onChange={onCountryChange}
          value={getValue(country, filterCountries)}
          placeholder="выберите страну..."
        />
      </div>
      <div className="number-input">
        <p>рейтинг:</p>
        <div className="input-container">
          <input
            type="number"
            placeholder="от"
            min={1}
            max={9}
            value={ratingMin}
            onChange={(e) => onRatingMinChange(e.currentTarget.value)}
          />
          <input
            type="number"
            placeholder="до"
            min={2}
            max={10}
            value={ratingMax}
            onChange={(e) => onRatingMaxChange(e.currentTarget.value)}
          />
        </div>
      </div>
      <div className="number-input">
        <p>год:</p>
        <div className="input-container">
          <input
            type="number"
            placeholder="от"
            min={1900}
            max={2023}
            value={yearMin}
            onChange={(e) => onYearMinChange(e.target.value)}
          />
          <input
            type="number"
            placeholder="до"
            min={1900}
            max={2023}
            value={yearMax}
            onChange={(e) => onYearMaxChange(e.target.value)}
          />
        </div>
      </div>
      <div className="filter-btn">
        <button onClick={() => clearFilterState()}>очистить</button>
        <button onClick={() => onSearchClick()}>поиск</button>
      </div>
    </div>
  );
};

export default Filter;
