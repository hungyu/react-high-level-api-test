import React, { useState, useEffect, useRef } from 'react'

const useSafeState = (initialState) => {
	const [state, setState] = useState(initialState);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true
		console.log('call use effect');
		return () => {
			isMountedRef.current = false
		} 
	}, [isMountedRef]);

	const safeSetState = (...args) => isMountedRef.current ? setState(...args) : () => {}

	return [state, safeSetState];
}

const WrapperComponent = props => {
	console.log('call wrapped component');
	const [state, setState] = useSafeState(0);
	console.log('call wrapped component 2');
	return (
		<div>
			<div>count: {state}</div>
			<button onClick={() => {setState(state + 1)}}> increase count </button>
		</div>
	)
}

export default WrapperComponent