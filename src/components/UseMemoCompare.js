// https://medium.com/@francisrochon/you-need-to-keep-track-of-the-mounted-state-of-your-component-heres-a-quick-example-55b9f059230a
import React, { useState, useRef, useEffect } from 'react'

const useMemoCompare = (cur, callback) => {
    const previous = useRef(null);
    useEffect(() => {
        previous.current = cur;
    }, [cur])

    return callback(previous.current, cur);
}

const WrapperComponent = props => {
    const [state, setState] = useState({
        id: 1
    });
    console.log(state.id)

    // Use the previous obj if the "id" property hasn't changed
	useMemoCompare(state, (prev, next) => {
        if (prev && prev.id === next.id) {
            console.log('I use previous value');
        } else {
            console.log('I sue new value');
        }
        return prev && prev.id === next.id;
    });
	return (
		<div>
			<button onClick={()=> {
                const value = Math.random();

                if (value < 0.5) {
                    // change id
                    setState({id: 2})
                } else {
                    setState({id: 1})
                }
            }}> click to toggle </button>
		</div>
	)
}

export default WrapperComponent