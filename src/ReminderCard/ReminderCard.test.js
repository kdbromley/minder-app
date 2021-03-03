import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ReminderCard from './ReminderCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <ReminderCard />
  </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});
