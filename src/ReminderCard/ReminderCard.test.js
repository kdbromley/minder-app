import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ReminderCard from './ReminderCard';

const reminder = {
  id: 1,
  title: 'Test',
  due_date: '2021-04-10T12:00:00.000Z',
  reminder_notes: 'Test notes',
  completed: false,
  user_id: 1
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <ReminderCard reminder={reminder}/>
  </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});
