import React, { useEffect, useState } from 'react'

export default function useFetchApi(url) {
	const [result, setResult] = useState([]);

	useEffect(() => {
		fetch(url)
			.then(res => {
				return res.json()
			})
			.then(data => {
				setResult(data.users)
			})
	}, [url])

	return result;
}