import React, {useEffect, useState, useRef} from 'react';

const usePrevious = (value) => {
    let previous = useRef(null);

    useEffect(() => {
        previous.current = value
    }, [value])

    return previous.current
}

export default function Counter() {
    const [state, setState] = useState(1);
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
}
