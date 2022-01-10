// https://medium.com/@francisrochon/you-need-to-keep-track-of-the-mounted-state-of-your-component-heres-a-quick-example-55b9f059230a
import React, { useState } from 'react'

const useToggle = (initialState=false) => {
    const [isToggled, setState] = useState(initialState);
    
    const setToggle = () => {
        setState(c => !c);
    };

	return [isToggled, setToggle];
}

const WrapperComponent = props => {
	const [isToggled, setToggle] = useToggle();
	return (
		<div>
			<div>isToggled: {isToggled? 'true':'false'}</div>
			<button onClick={setToggle}> click to toggle </button>
		</div>
	)
}

export default WrapperComponent