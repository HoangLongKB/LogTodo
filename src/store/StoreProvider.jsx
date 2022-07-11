import { useReducer } from 'react';
import storeReducer from './storeReducer';
import { initState } from './storeConstant';
import StoreContext from './StoreContext';

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      { children }
    </StoreContext.Provider>
  );
}

export default StoreProvider;
