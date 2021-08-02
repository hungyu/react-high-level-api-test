import React, { useEffect, useState, useRef } from 'react'

function ListItem({ title, inputValue }) {
	let updatedTitle = <span> {title} </span>;

	if (inputValue) {
		const idx = title.indexOf(inputValue)
		if (idx !== -1) {
			const left = title.substring(0, idx);
			const right = title.substring(idx + inputValue.length)

			updatedTitle = [left, <b>{inputValue}</b>, right]
			console.log(updatedTitle)
		}
	}

	return (
		<li>
			{updatedTitle}
		</li>
	)
}

// we assume api should give correct response for the list and we can show it
const AutoCompleteFromAPI = () => {
	const [val, setVal] = useState('');
	const [list, setList] = useState([]);
	const timeOutRef = useRef(null)

	const fetchData = (e) => {
		const value = e.target.value;
		// we can enhance this function with debounce
		clearTimeout(timeOutRef.current);

		const newTimeout = setTimeout(() => {
			setVal(value)
		}, 500);// debounce with 500 ms

		timeOutRef.current = newTimeout;
	}

	useEffect(() => {
		// we don't need to fetch at first time
		if (!val) {
			setList([])
			return;
		}

		// should post input value 
		fetch('/api/list',{
			method: 'POST',
			body: JSON.stringify(val)
		}).then((res) => {
			return res.json()
		}).then((data) => {
			setList(data)
		});
	}, [val])

	return (
		<div>
			<input onChange={fetchData}/>
			<ul>
				{list.map(({title, id}) => {
					return <ListItem title={title} key={id}/>
				})}
			</ul>
		</div>
	)
}


function AutoCompeleteComponentWithClientSideFilter(props) {
	const [val, setVal] = useState('');
	const [list, setList] = useState([]);
	const [isInputFocus, setInputFocus] = useState(false)
	const [suggestedList, setSuggestedList] = useState([])


	const changeInput = (e) => {
		setVal(e.target.value);
		if (!e.target.value.trim()) {
			setSuggestedList([]);
		}
		if (e.target.value.trim() === val.trim()) {
			return;
		}
		setSuggestedList(list.filter(({title}) => {
			return title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
		}));
	}

	const focusInput = (isFocus) => {
		setInputFocus(isFocus);
	}

	// fetch data at first time component render
	useEffect(() => {
		const fetchList = async () => {
			try {
				const res = await fetch('/api/list');

				if (!res.ok) {
					// handle api errors
					// error message
					// console.log(JSON.parse(res._bodyText));
					return 
				}

				const list = await res.json();
				setList(list);
			} catch(e) {
				// handle fetch error: ex: API do not exist
				console.log(e);
			}
		}

		fetchList();
	}, [])

	return (
		<div>
			<input onChange={changeInput} value={val} onFocus={focusInput.bind(this, true)} onBlur={focusInput.bind(this, false)}/>
			<ul>
				{isInputFocus && suggestedList.map(({title, id}) => {
					return <ListItem title={title} key={id} inputValue={val}/>
				})}
			</ul>
		</div>
	)
}


export default function Index() {
	return (
		<div>
			<AutoCompleteFromAPI />
			<AutoCompeleteComponentWithClientSideFilter />
		</div>
	)
}