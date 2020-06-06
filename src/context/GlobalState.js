import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

// Initial state
const initalState = {
  transactions: localStorage.getItem('transactions') !== null ? localStorageTransactions : []
}

// Create context
export const GlobalContext = createContext(initalState);

// Provider component
export const GlobalProvider = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, initalState);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
  }, [state.transactions]);

  // Actions
  function deleteTransaction(id){
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction(transaction){
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    deleteTransaction,
    addTransaction
  }}>
    {children}
  </GlobalContext.Provider>);
}
