import React, { useCallback, useMemo, Fragment, memo } from 'react'

function CallbackCompnent() {
	return (
		<Parent term={'abc'}/>
	)
}

function MyBigList({ term, onItemClick }) {
  const items = ['a', 'b']; // assume big list of item
  const map = (item, s) => <div onClick={onItemClick} key={s}>{item}</div>;

	return (
		<Fragment>
			When I click'd the following list, random number won't change
			{items.map(map)}

			i'm render, random number to check =  {Math.random()}
		</Fragment>
	);
}

const MemoContent = memo(MyBigList);


function doSomeThing({e, term}) {
	console.log(e);
	console.log('see my term = ', term);
	console.log('on item clicked');
}

// 這邊是使用useCallback的好時機, 因為child component用memo包起來, callback又要往下傳, 這樣可以減少 child component render 次數
function Parent({ term }) {
	const onItemClick = useCallback(
		(e) => {
			// 這行只有在item 被click會印
			console.log('on item click ')
			return doSomeThing({e, term})
		},
		[term]
	);
	
	const onItemClick2 = useMemo(
		(e) => {
			// 這行第一次就會跑進來印，因為 useMemo的term跟之前是不同的，所以memo的內容會先跑並記錄下來
			console.log(123)
			// 這邊看來拿不到e,
			return doSomeThing.bind(this, {e, term})
		},
		[term]
	);

	return (
		<MemoContent
		term={term}
		// 使用   onItemClick or onItemClick2都可以呼叫到do some thing
		onItemClick={onItemClick}
    />
	)
}

export default CallbackCompnent