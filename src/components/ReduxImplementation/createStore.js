const createStore = (reducer, initialState = {}) => {
	let state = initialState;
	const listeners = [];

	return {
		getState() {
			return state;
		},
		subscribe(listener) {
			listeners.push(listener);

			// return unsubscribe function
			return () => {
				const index = listeners.indexOf(listener);
				listener.splice(index, 1);
			}
		},
		dispatch(action) {
			state = reducer(state, action);

			listeners.forEach(listener => {
				listener();
			});
		}
	}
}

export default createStore;