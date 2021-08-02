import React, { useEffect, useState, Fragment, useLayoutEffect } from 'react'

const UseEffectTest = props => {
	useLayoutEffect(() => {
		console.log('use layouteffect');
		return () => {
			console.log('clear use layout effect');
		}
	})

	useEffect(() => {
		console.log('use effect');

		return () => {
			console.log('clear use effect');
		}
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
		<Fragment>
		<button onClick={() => {setState((state) => !state)}}>change tab</button>
		{
			state === false ?
				<UseEffectTest />
				:
				<div>tab 2</div>
		}
		</Fragment>
	)
}


export default Wrapper