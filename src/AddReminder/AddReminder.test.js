import React from 'react';
import ReactDOM from 'react-dom';
import AddReminder from './AddReminder';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddReminder />, div);
  ReactDOM.unmountComponentAtNode(div);
});
