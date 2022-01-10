import React, {useEffect, useReducer, useState, useRef} from 'react';

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

const usePrevious = (value) => {
    let previous = useRef(null);

    useEffect(() => {
        previous.current = value
    }, [value])

    return previous.current
}

const useSafeState = (initialValue=null) => {
    const [state, setState] = useState(initialValue);
    const isMountedRef = useRef(false);

    useEffect(() => {
        isMountedRef.current = true;

        return () => {
            isMountedRef.current = false;
        }
    }, [isMountedRef])

    const setSafeState = (args) => {
        if (isMountedRef.current) {
            return setState(args)
        } else {
            return null
        }
    }

    return [state, setSafeState];
}

export default function Counter() {
    const [state, setState] = useSafeState(1);
    const pre = usePrevious(state);
    
    return (
        <div>
            <div onClick={()=>{setState(c => c + 1)}}>click me to change state</div>
            <div>
                {state}
            </div>
            <div>
                show pre: {pre}
            </div>
        </div>
    );
    // const [state, dispatch] = useReducer(reducer, 11, init);
    // useEffect(() => {
    //     // document click event
    //     document.addEventListener('click', function() {
    //         console.log('click be called')
    //     })
    // }, [])
    // return (
    //     <>
    //         Count: {state.count}
    //         <button
    //             onClick={() => dispatch({type: 'reset', payload: 10})}>
    //             Reset
    //         </button>
    //         <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    //         <button onClick={(e) => {
    //             // 即使我們這邊做stop propagation, use effect 中document click event還是會接收到，這是因為在
    //             // react 16版以下時，都還是把event delegate到document，所以stop不掉
    //             e.stopPropagation();
    //             dispatch({type: 'increment'})
    //         }}>+</button>
    //     </>
    // );
}
