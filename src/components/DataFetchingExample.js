import React, { useEffect, useState, Fragment } from 'react'
// custom hooks
import useFetchApi from '../hooks/useFetchApi';

// get users
async function getUserList() {
	return await fetch('/api/users');
}

// get users, but api return 500
async function getUserListFail() {
	return await fetch('/api/users-error');
}

export function DataFetchingExample() {
	const [list, setList] = useState([]);

	useEffect(() => {
		getUserList()
			.then((res)=> {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res.json()
			})
			.then((data) => {
				setList(data.users)
			})
			.catch((res) => {
				console.log('fetch article list lisk error ');
			});

		getUserListFail()
			.then((res)=> {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res.json()
			})
			.then((data) => {
				console.log(data);
			})
			.catch((message) => {
				console.log('fetch api error with error message = ', message);
			});


	}, []);

	return (
		<div>
			API fetch list:
			{
				list.map(({ name, id }) => {
					return <div key={id}>{name}</div>
				})
			}
		</div>
	)
}

const ParallelFetch = () => {
	useEffect(() => {
		Promise.all([getUserList(), getUserListFail()])
			.then(res => {
				return Promise.all(res.map(r => r.json()));
			})
			.then(data => {
				// handle data and errors 
			})
			.catch(data => {
				console.log(data);
			})
	}, [])

	return <div>test</div>
}

const FetchApiWithCustomHooks = () => {
	const data = useFetchApi('/api/users') || [];

	return <div>
		API fetch list with custom Hooks:
			{
				data.map(({ name, id }) => {
					return <div key={id}>{name}</div>
				})
			}
	</div>
}


const ShowList = () => {
	return (
		<Fragment>
			<ParallelFetch />
			<DataFetchingExample />
			<FetchApiWithCustomHooks />
		</Fragment>
	)
}

export default ShowList;