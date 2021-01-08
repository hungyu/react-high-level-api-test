import React, { useEffect, useState } from 'react'

const store = () => {
	return {
		subscribe() {
			console.log('this place should be called at effect phrase');
			return () => {
				console.log('this function should be called at clean phrase');
			}
		}
	}
}

const myStore = store();


const UseEffectTest = props => {
	console.log('render useeffect test component');
	useEffect(() => {
		return myStore.subscribe()
	});

	return (
		<div>
			use effect test
		</div>
	)
}


const Wrapper = () => {
	const [state, setState] = useState(false);

	return (
		<>
		<button onClick={() => {setState((state) => !state)}}>change tab</button>
		{
			state === false ?
				<UseEffectTest />
				:
				<div>tab 2</div>
		}
		</>
	)
}


export default Wrapper