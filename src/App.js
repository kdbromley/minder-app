import React from 'react';
import { Link, Route } from 'react-router-dom';
import DisplayReminders from './DisplayReminders/DisplayReminders';
import Sidebar from './Sidebar/Sidebar';
import ReminderPage from './ReminderPage/ReminderPage';
import AddReminder from './AddReminder/AddReminder';
import LandingPage from './LandingPage/LandingPage';
import RemindersContext from './RemindersContext';
import { API_BASE_URL, REMINDERS_ENDPOINT } from './config';
import './App.css';
import ErrorBoundary from './ErrorBoundary';

class App extends React.Component {
  state = {
    reminders: [],
    currentDate: '',
  }

  loadReminders = reminders => {
    this.setState({ reminders: reminders })
  }
  getTodayDate = today => {
    this.setState({ currentDate: today })
  }

  componentDidMount() {
    fetch(API_BASE_URL + REMINDERS_ENDPOINT)
    .then(res => {
      if(!res.ok)
        return res.json().then(e => Promise.reject(e));
  
      return res.json()
    })
    .then(reminders => {
      this.loadReminders(reminders)
    })
    .catch(err => {
      console.log({err})
    })

    let today = new Date().toISOString();
    this.getTodayDate(today)
  }

  handleAddReminder = reminder => {
    this.setState({ reminders: [...this.state.reminders, reminder] })
  }

  handleDeleteReminder = reminderId => {
    this.setState({
      reminders: this.state.reminders.filter(reminder => reminder.id !== reminderId)
    })
  }

  handleEditReminder = (reminderId, updatedReminder) => {
    const matchId = (reminder) => ( reminder.id === reminderId ) 
    const indexNum = this.state.reminders.findIndex(matchId)
    this.state.reminders.splice(indexNum, 1, updatedReminder)
  }
  
  handleCheckReminder = reminderId => {
    this.setState((prevState) => {
      return {
        reminders: prevState.reminders.map((reminder) => {
          if (reminder.id === reminderId) {
            return { ...reminder, completed: true }
          } else {
            return reminder
          }
        }),
      };
    });
  }

  handleUncheckReminder = reminderId => {
    this.setState((prevState) => {
      return {
        reminders: prevState.reminders.map((reminder) => {
          if (reminder.id === reminderId) {
            return { ...reminder, completed: false };
          } else {
            return reminder;
          }
        }),
      };
    });
  }
  
  renderRoutes() {
    const todaysReminders = this.state.reminders.filter(reminder => reminder.dueDate === this.state.currentDate)
    return (
      <>
      <Route
       path='/'
       component={Sidebar}
      />
      <Route
       exact
       path='/'
       render={(props) => 
         <LandingPage {...props} reminders={todaysReminders} />
       }
      />
      <Route
       exact
       path='/reminders'
       component={DisplayReminders}
      />
      <Route
       path='/reminders/:reminderId'
       component={ReminderPage}
      />
      <Route
       path='/reminders/archive'
      />
      <Route
       path='/add-reminder'
       component={AddReminder}
      />
      </>
    )
  }
  
  render() {
    const contextValue = {
      reminders: this.state.reminders,
      currentDate: this.state.currentDate,
      addReminder: this.handleAddReminder,
      deleteReminder: this.handleDeleteReminder,
      editReminder: this.handleEditReminder,
      checkReminder: this.handleCheckReminder,
      uncheckReminder: this.handleUncheckReminder,
    }
    return (
      <div className="App">
       <RemindersContext.Provider value={contextValue}>
          <header className="App__header">
            <h1>
              <Link to='/'>'minder</Link>
            </h1>
          </header>
          <main className='App__main'>
            <ErrorBoundary>
            {this.renderRoutes()}
            </ErrorBoundary>
          </main>
       </RemindersContext.Provider>
        <footer>
          Footer
        </footer>
      </div>
    );
  }
}

export default App;
