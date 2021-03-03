import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ReminderPage from './ReminderPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <ReminderPage />
  </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});
