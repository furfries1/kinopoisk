import { ReactNode } from "react";

export interface IPageTemplate {
  children: ReactNode;
}

export interface IMenu {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export interface IFilterMenu {
  isFilterOpen: boolean;
  setIsFilterOpen: (value: boolean) => void;
}

export interface IGenre {
  genre: string;
}

export interface ICountry {
  country: string;
}

export interface IMovie {
    filmId?: number;
    kinopoiskId?: number;
    nameRu: string;
    nameEn?: string;
    year?: number;
    countries?: [ICountry];
    genres?: [IGenre];
    rating?: string;
    ratingKinopoisk?: number;
    relationType?: string;
    posterUrl: string;
    posterUrlPreview: string;
}

export interface IMovies {
  movie: IMovie
}

export interface ISelectedMovie {
  kinopoiskId: number;
  nameRu: string;
  nameOriginal: string;
  posterUrlPreview: string;
  shortDescription: string;
  year: number;
  filmLength: number;
  slogan: string;
  ratingImdb: number;
  ratingKinopoisk: number;
  description: string;
  genres: [IGenre];
  countries: [ICountry];
}

export interface IMoviePage {
  moviePage: ISelectedMovie
}

export interface ILink {
  url: string;
  platform: string;
  logoUrl: string;
}

export interface ILinks {
  link: ILink;
}

export interface IPagination {
  pageType: string;
  currentPage: number;
}

export interface IStaff {
  staffId: number;
  nameRu: string;
  posterUrl: string;
  professionText: string;
  professionKey: string;
}

export interface IDirector {
  director: IStaff;
}

export interface IActor {
  actor: IStaff;
}


export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IFavoriteMovies {
  filmId: number;
  name: string;
  poster: string;
}

export interface IFavoriteMovie {
  favoriteMovies: IFavoriteMovies
  deleteMovie: (filmId: number) => void;
}