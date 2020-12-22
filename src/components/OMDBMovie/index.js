// https://react-projects-21-movie-db.netlify.app/
// http://www.omdbapi.com/
import React, { useState, useEffect, useRef } from 'react'
import {
  Link
} from "react-router-dom";

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}


const useFetch = (url, setMovieList, setErrorMsg) => {
	const apiRef = useRef(url);
	apiRef.current = url // 使用 ref 永遠記錄最新的url值

	useEffect(() => {
		setTimeout(() => {
			// console.log('apiref =', apiRef.current);
			// console.log('timeout = ', url);
			// 假設這是一個api call, apiRef.current是最新值
			// 而url是useEffect早期useEffect被叫的時候的值
			// 	  所以如果 apiRef.current !== url的話, 表示url這個effect是之前call的,
			//    我們可以直接忽略
			if (apiRef.current !== url) {
				return 
			}
			// 往下做api 事情
		}, 1000);

		fetch(url)
			.then((res) => {
				// discard previous api call response
				if (apiRef.current !== url) {
					return 
				}

				return res.json();
			})
			.then((data) => {
				if (data.Response === 'False') {
					throw Error('fetch data error')
				}
				console.log(data);
				setMovieList(data.Search);
				setErrorMsg('')
			})
			.catch((error) => {
				setErrorMsg('Movie Not Found!')
			})
	}, [url, setMovieList, setErrorMsg])
}

const CardListItem = ({ imgSrc, title, url, imdbID}) => {
	return <li>
		<Link to={`/movies/${imdbID}`}>
			<img src={imgSrc} alt={title}/>
			<div className="name">{title}</div>
		</Link>
	</li>
}


const SearchInput = ({ searchVal, setSearchVal, errorMsg }) => {
	return <div>
		<h1>Search Movies</h1>
		<input type="text" onChange={(e)=> setSearchVal(e.target.value)} value={searchVal}/>
		<div>{errorMsg}</div>
	</div>
}

export default function Index() {
	const [movieList, setMovieList] = useState([]);
	const [searchVal, setSearchVal] = useState('bet');
	const [errorMsg, setErrorMsg] = useState('')
	const debouncedUrl = useDebounce(`http://www.omdbapi.com/?apikey=21d545f0&s=${searchVal}`, 300);

	useFetch(debouncedUrl, setMovieList, setErrorMsg)

	return (
		<div>
			<SearchInput
				searchVal={searchVal}
				setSearchVal={setSearchVal}
				errorMsg={errorMsg}
			/>
			{!errorMsg?
				<ul>
					{
						movieList.map(({ Title, imdbID, Poster }) => {
							return <CardListItem
								key={imdbID}
								title={Title}
								imgSrc={Poster}
								imdbID={imdbID}
							/>
						})
					}
				</ul>
			: null}
		</div>
	)
}