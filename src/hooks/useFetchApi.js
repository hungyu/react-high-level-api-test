import React, { useEffect, useState } from 'react'

export default function useFetchApi(url) {
	const [result, setResult] = useState({});
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMsg, setErrorMsg] = useState('')

	useEffect(() => {
		fetch(url)
			.then(res => {
				if (!res.ok) {
					// throw Error(res.statusText); 這樣會return object
					return Promise.reject('fetch data error')
				}
				return res.json()
			})
			.then(data => {
				setResult(data)
			})
			.catch(e => {
				setErrorMsg(e);
			})
			.then(data => {
				setIsLoading(false);
				setIsError(true);
			});
	}, [url])

	return { isLoading, isError, errorMsg, result };
}