import React, {useEffect, useReducer} from 'react';

function init(initialCount) {
    // user can do some changes to update real initil values
    return { count: initialCount + 100 };
}
  
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        case 'reset':
            return init(action.payload);
        default:
            throw new Error();
    }
}

export default function Counter() {
    const [state, dispatch] = useReducer(reducer, 11, init);
    useEffect(() => {
        // document click event
        document.addEventListener('click', function() {
            console.log('click be called')
        })
    }, [])
    return (
        <>
            Count: {state.count}
            <button
                onClick={() => dispatch({type: 'reset', payload: 10})}>
                Reset
            </button>
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button onClick={(e) => {
                // 即使我們這邊做stop propagation, use effect 中document click event還是會接收到，這是因為在
                // react 16版以下時，都還是把event delegate到document，所以stop不掉
                e.stopPropagation();
                dispatch({type: 'increment'})
            }}>+</button>
        </>
    );
}
