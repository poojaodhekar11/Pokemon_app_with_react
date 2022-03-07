import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history'
import Home from 'components/Home';
import { Provider } from 'react-redux';
import store from 'store';

test('full app rendering/navigating', () => {
  const history = createMemoryHistory()
  render(
    <Provider store={store}>
    <Router history={history}>
      <Home />
    </Router>
    </Provider>
  )
  // verify page content for expected route
  expect(screen.getByText(/pokemon application/i)).toBeInTheDocument()
})