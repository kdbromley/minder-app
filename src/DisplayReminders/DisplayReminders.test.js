import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import DisplayReminders from './DisplayReminders';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <DisplayReminders />
  </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});
