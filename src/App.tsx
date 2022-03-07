import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import Home from './components/Home';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} ></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
