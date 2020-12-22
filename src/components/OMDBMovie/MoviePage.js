import React, { useState, useEffect } from 'react'
import {
  useLocation,
  Link
} from "react-router-dom";

const useFetch = (url, setMovieList, setIsLoading) => {
	useEffect(() => {
		fetch(url)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (data.Response === 'False') {
					throw Error('fetch data error')
				}
				setMovieList(data);
				setIsLoading(false);
			})
			.catch((error) => {
			})
	}, [url, setMovieList, setIsLoading])
}

export default function MoviePage() {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const location = useLocation()
	const pathAry = location.pathname.split('/');
	const id = pathAry[pathAry.length - 1];

	useFetch(`http://www.omdbapi.com/?apikey=21d545f0&i=${id}`, setMovie, setIsLoading)
	

	if (isLoading) {
		return <div>loading ...</div>
	}

	return (
		<div>
			<Link to="/omdb-movie">
				<img src={movie.Poster} alt={movie.Title} />
				<h1>{movie.Title}</h1>
				<div>{movie.Plot}</div>
				<div>{movie.Year}</div>
				<button>Back to movies</button>
			</Link>
		</div>
	)
}