import React from 'react';
import { connect, useDispatch } from './Store';

const ContextStateManagement = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <h3>Global Context Value: {props.count} </h3>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
      <button onClick={props.increment}>Increment</button>
    </>
  );
};

const mapStateToProps = ({ countReducer }) => {
  return {
    count: countReducer.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContextStateManagement);
