import React, { createContext } from 'react';

export const StoreContext = createContext();

const StoreProvider = ({ children, store }) => {
	return (
		<StoreContext.Provider value={store}>
			{children}
		</StoreContext.Provider>
	)
}

export default StoreProvider