import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './SideBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <Sidebar />
  </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});
