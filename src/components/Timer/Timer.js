import React, { useState, useEffect, memo, useCallback, useRef } from 'react'

const Timer = ({ deleteTimer, uuid }) => {
	const [timer, setTimer] = useState(0)
	const [count, setCount] = useState(1);

	useEffect(() => {
		const id = setInterval(() => {
			// use function update state to prevent useEffect to call to much
			// https://reactjs.org/docs/hooks-reference.html#functional-updates
			setTimer((t) => t + count)
		}, 1000)

		return () => {
			clearInterval(id)
		};
	}, [count])

	return <div>
		Timer: {timer}
		<input type="number" onChange={(e) => {
				setCount(parseInt(e.target.value, 10))
		}}/>
		<button onClick={() => {setTimer(0); setCount(1)}}> Reset Timer </button>
		<button onClick={deleteTimer.bind(this, uuid)}> Delete Timer </button>
	</div>
}

const TimerMemo = memo(Timer);

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function TimerLayout() {
	const [timerList, setTimerList] = useState([]);
	/*
		使用useRef紀錄著timerList, 這樣在useCallback時的dependency list就不需要列出timerList
		因此useCallback內部的function就能更好的被memo起來.

		這樣能讓下方使用memo的component因usecallback function不動, 而不需要重新render

		可以compare to 列出timerList in usecallback的狀況, 會發現因為timerListㄧ值動,導致child全部都被重新render
		(使用 chrome profiler)
	*/
	const timerRef = useRef();

	const deleteTimer = useCallback(
		(id) => {
			const newTimerList = timerRef.current.filter(uuid => uuid !== id);
			// 紀錄最新list值
			timerRef.current = newTimerList
			setTimerList(newTimerList)
		},
		[setTimerList, timerRef]
	);

	return (
		<div>
			{
				timerList.map((uuid) => {
					return <TimerMemo uuid={uuid} deleteTimer={deleteTimer} key={uuid}/>
				})
			}
			<button onClick={()=>{
				const newTimerList = [...timerList, uuidv4()]
				setTimerList(newTimerList)
				// 紀錄最新list值
				timerRef.current = newTimerList
			}
			}>add timer</button>
		</div>
	)
}