import React, { useState, useEffect, useRef } from 'react'

const useSafeState = (initialState) => {
	const [state, setState] = useState(initialState);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true

		return () => {
			isMountedRef.current = false
		} 
	}, [isMountedRef, initialState]);

	const safeSetState = (...args) => isMountedRef.current ? setState(...args) : () => {}

	return [state, safeSetState];
}

const WrapperComponent = props => {
	const [state, setState] = useSafeState(0);

	return (
		<div>
			<div>count: {state}</div>
			<button onClick={() => {setState(state + 1)}}> increase count </button>
		</div>
	)
}

export default WrapperComponent