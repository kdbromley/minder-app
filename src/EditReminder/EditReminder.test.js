import React from 'react';
import ReactDOM from 'react-dom';
import EditReminder from './EditReminder';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditReminder />, div);
  ReactDOM.unmountComponentAtNode(div);
});
