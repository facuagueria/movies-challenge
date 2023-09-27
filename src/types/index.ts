export interface Data {
  Search: Search[]
  totalResults: string
  response: string
}

export interface Search {
  Title: string
  Year: string
  imdbID: string
  Type: Type
  Poster: string
}

export enum Type {
  Movie = 'movie',
  Series = 'series'
}

// Movie details

export interface DetailsData {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  Dvd: string
  boxOffice: string
  Production: string
  Website: string
  Response: string
  totalSeasons?: number
}

export interface Rating {
  source: string
  value: string
}
