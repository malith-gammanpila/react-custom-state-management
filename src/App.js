import React from 'react';
import ContextStateManagement from './custom-state-manager/ContextStateManagement';
import CounterUseReducer from './custom-state-manager/CounterUseReducer';
import reducers from './custom-state-manager/Reducers';
import { Provider, applyMiddleware } from './custom-state-manager/Store';

import './index.css';

const md = applyMiddleware(console.log);
function App() {
  return (
    <Provider reducers={reducers} applyMiddleware={md}>
      <CounterUseReducer />
      <hr />
      <ContextStateManagement />
    </Provider>
  );
}

export default App;
