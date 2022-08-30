import React, { useReducer, createContext, useContext } from 'react';

const initialState = {};
export const Context = createContext(initialState);

export const applyMiddleware =
  (...funcs) =>
  (_state, _action) =>
    funcs.forEach((func) => func(_state, _action));

export const Provider = ({ children, reducers, applyMiddleware, ...rest }) => {
  const defaultState = reducers(undefined, initialState);
  if (defaultState === undefined) {
    throw new Error("reducer's should not return undefined");
  }
  const [state, dispatch] = useReducer((_state, _action) => {
    applyMiddleware(_state, _action);
    return reducers(_state, _action);
  }, defaultState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const combineReducers = (reducers) => {
  const entries = Object.entries(reducers);
  return (state = {}, action) => {
    return entries.reduce((_state, [key, reducer]) => {
      _state[key] = reducer(state[key], action);
      return _state;
    }, {});
  };
};

export const connect = (mapStateToProps, mapDispatchToProps) => {
  return (WrappedComponent) => {
    return (props) => {
      const { state, dispatch } = useContext(Context);
      let localState = { ...state };
      if (mapStateToProps) {
        localState = mapStateToProps(state);
      }
      if (mapDispatchToProps) {
        localState = { ...localState, ...mapDispatchToProps(dispatch, state) };
      }
      return (
        <WrappedComponent
          {...props}
          {...localState}
          state={state}
          dispatch={dispatch}
        />
      );
    };
  };
};

// Use Selector alternative for connect function
export const useSelector = (callback) => {
  const state = { ...useContext(Context).state };
  return callback ? callback(state) : state;
};

// returns a reference to the dispatch function from the context
export const useDispatch = () => useContext(Context).dispatch;
