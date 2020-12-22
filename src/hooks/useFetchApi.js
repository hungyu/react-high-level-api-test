import React, { useEffect, useState, useReducer } from 'react'

export function useFetchApiV1(url) {
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


export default function useFetch(url) {
	const reducer = (state, { type, payload }) => {
		switch(type) {
			case 'fetchFail':
				return {
					...state,
					isLoading: false,
					isError: true,
					errorMsg: payload
				}
			case 'fetchSuccess':
				return {
					...state,
					isLoading: false,
					isError: false,
					result: payload
				}
			default:
				return {
					...state,
					isLoading: false,
					isError: true,
					result: payload	
				}
		}
	}

	const [state, dispatch] = useReducer(reducer, {
		isLoading: true,
		isError: false,
		errorMsg: '',
		result: {}
	});

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
				dispatch({type: 'fetchSuccess', payload: data});
			})
			.catch(e => {
				dispatch({type: 'fetchFail', payload: e});
			})
	}, [url])

	return state
}