import React from 'react';
import { Link, Route } from 'react-router-dom';
import DisplayReminders from './DisplayReminders/DisplayReminders';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import ReminderPage from './ReminderPage/ReminderPage';
import AddReminder from './AddReminder/AddReminder';
import LandingPage from './LandingPage/LandingPage';

class App extends React.Component {
  
  renderRoutes() {
    return (
      <>
      <Route
       path='/'
       component={Sidebar}
      />
      <Route
       exact
       path='/'
       component={LandingPage}
      />
      <Route
       path='/reminders'
       component={DisplayReminders}
      />
      <Route
       path='reminders/:reminderId'
       component={ReminderPage}
      />
      <Route
       path='/add-reminder'
       component={AddReminder}
      />
      </>
    )
  }
  
  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1>
            <Link to='/'>'minder</Link>
          </h1>
        </header>
        <main className='App__main'>
          {this.renderRoutes()}
        </main>
        <footer>
          Footer
        </footer>
      </div>
    );
  }
}

export default App;
