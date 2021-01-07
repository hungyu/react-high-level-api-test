import React, { useContext, useState, useEffect } from 'react'
import createStore from './createStore';
import StoreProvider, { StoreContext } from './StoreProvider';

// reducer
const reducer = (state, action) => {
	switch (action.type) {
		case 'DELETE':
			return {
				...state,
				todos: state.todos.filter(todo => todo.id !== action.payload)
			}
		default:
			return state		
	}
}

// store
const store = createStore(reducer, {
	todos: [{id: 'a', content: 'A'}]
});

// connect HOC
const connect = mapStateToProps => WrappedComponent => props =>{
	const store = useContext(StoreContext);
	const [state, setState] = useState(() => {
		return mapStateToProps(store.getState(), props)
	});

	const propsRef = React.useRef();
	propsRef.current = props;

	useEffect(() => {
		return store.subscribe(()=> {
			setState(
				mapStateToProps(store.getState(), propsRef.current)
			)
		});
	}, [store, setState, propsRef])

	return (
		<WrappedComponent
			{...props}
			{...state}
			dispatch={store.dispatch}
		/>
	);
}


// Todo
const Todo = ({ id, content, dispatch }) => {
	return (
		<li
			onClick={() => {
				dispatch({ type: 'DELETE', payload: id})
			}}
		>
			{content}
		</li>
	)
}

const TodoContainer = connect((state, ownProps) => ({
	content: state.todos.find(todo => todo.id === ownProps.id).content
}))(Todo);


const TodoList = ({ todos }) => {
	return <ul>
		{todos.map(todo => (
			<TodoContainer key={todo.id} id={todo.id} />
		))}
	</ul>
}


const TodoListContainer = connect(state => ({
	todos: state.todos
}))(TodoList);

const TodoWrapper = () => {
	return <StoreProvider store={store}>
		<TodoListContainer/>
	</StoreProvider>
}


export default TodoWrapper