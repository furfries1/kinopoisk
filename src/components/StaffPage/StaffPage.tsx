import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { GET_STAFF_PAGE } from "src/actions/actions";
import PageTemplate from "../PageTemplate/PageTemplate";
import "./style.scss";
import { getRatingColorPerson } from "src/helpers";

const StaffPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const person = useSelector(({ pages }) => pages.person);
  const {
    posterUrl,
    nameRu,
    nameEn,
    age,
    birthday,
    birthplace,
    profession,
    growth,
    death,
    deathplace,
    facts,
    films,
  } = person;
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    dispatch(GET_STAFF_PAGE(Number(id)));
  }, []);
  return (
    <PageTemplate>
      <div className="person-container">
        <div className="poster-container">
          <img src={posterUrl} alt="ddd" />
        </div>
        <div className="person-info-container">
          <div className="person-info-short">
            <div className="person-name">{nameRu}</div>
            <div className="person-name-en">{nameEn ? nameEn : null}</div>
          </div>
          <div className="person-info-long">
            <div className="person-info-header">О персоне:</div>
            <div className="person-growth">
              <span>Рост:</span> {growth ? growth : "-"}
            </div>
            <div className="person-age">
              <span>Возраст:</span> {age ? age : "-"}
            </div>
            <div className="person-birthday">
              <span>Дата рождения:</span> {birthday ? birthday : "-"}
            </div>
            <div className="person-birthplace">
              <span>Место рождения:</span>
              {birthplace ? birthplace : "-"}
            </div>
            {death ? (
              <div className="person-birthday">
                <span>Дата смерти:</span> {death}
              </div>
            ) : null}
            {deathplace ? (
              <div className="person-birthday">
                <span>Место смерти:</span> {deathplace}
              </div>
            ) : null}
            <div className="person-career">
              <span>Карьера:</span>
              {profession ? profession : "-"}
            </div>
            {facts && facts.length !== 0 && (
              <div className="facts-container">
                <div className="facts-header">Факты:</div>
                {facts.slice(0, 5).map((e: any) => {
                  return <div className="facts">{e}</div>;
                })}
              </div>
            )}
            {films && films.length !== 0 && (
              <div className="films-container">
                <div className="films-header">Лучшие фильмы:</div>
                {films
                  .filter((e: any) => e.rating !== null && e.nameRu !== null)
                  .sort((a: any, b: any) => (a.rating < b.rating ? 1 : -1))
                  .slice(0, 10)
                  .map((e: any) => {
                    return (
                      <div
                        className="films"
                        onClick={() => navigate(`/movie/${e.filmId}`)}
                      >
                        <div className={getRatingColorPerson(e.rating)}>
                          {e.rating}
                        </div>{" "}
                        {e.nameRu}{" "}
                        <div className="role">
                          {e.description ? e.description : null}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default StaffPage;
