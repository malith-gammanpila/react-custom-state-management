import React, { useReducer } from 'react';
import { useSelector, Context } from './Store';

const reducers = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
  }
};

const CounterUseReducer = () => {
  const [state, dispatch] = useReducer(reducers, { count: 0 });
  const { count } = useSelector((state) => state.countReducer);

  return (
    <>
      <h3>Global Context Value: {count} </h3>
      <h3>Local State Value: {state.count} </h3>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
    </>
  );
};

export default CounterUseReducer;
