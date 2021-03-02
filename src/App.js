import React from 'react';
import { Link } from 'react-router-dom';
import DisplayReminders from './DisplayReminders/DisplayReminders';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import ReminderPage from './ReminderPage/ReminderPage';
import AddReminder from './AddReminder/AddReminder';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1>
            <Link to='/'>Minder</Link>
          </h1>
        </header>
        <main className='App__main'>
          <Sidebar />
          <DisplayReminders />
          <ReminderPage />
          <AddReminder />
        </main>
        <footer>
          Footer
        </footer>
      </div>
    );
  }
}

export default App;
