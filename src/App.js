import React from 'react';
import { Route } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import { format, parseISO } from 'date-fns'; 
import { API_BASE_URL, REMINDERS_ENDPOINT } from './config';
import DisplayReminders from './DisplayReminders/DisplayReminders';
import Navbar from './Navbar/Navbar';
import ReminderPage from './ReminderPage/ReminderPage';
import AddReminder from './AddReminder/AddReminder';
import LandingPage from './LandingPage/LandingPage';
import RemindersContext from './RemindersContext';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';
import './App.css';

class App extends React.Component {
  state = {
    reminders: [],
    currentDate: '',
    todaysReminders: [],
  }
  
  componentDidMount() {
    trackPromise(
      fetch(API_BASE_URL + REMINDERS_ENDPOINT)
      .then(res => {
        if(!res.ok)
          return res.json().then(e => Promise.reject(e));
    
        return res.json()
      })
      .then(reminders => {
        this.setState({ reminders: reminders })
      })
      .then(() => {
        let date = new Date()
        let today = format(date, 'MM/dd/yyyy')
        this.setState({ currentDate: today })
        this.getTodaysReminders()
      })
      .catch(err => {
        console.error({err})
      })
    );
  }

  getTodaysReminders = () => {
    let todaysReminders = this.state.reminders.filter(reminder => (format(parseISO(reminder.due_date), 'MM/dd/yyyy')) === this.state.currentDate)
    this.setState({ todaysReminders: todaysReminders })
    
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
    return (
      <>
      <Route
       exact
       path='/'
       render={(props) => 
         <LandingPage {...props} reminders={this.state.todaysReminders} />
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
            <Navbar />
          </header>
          <main className='App__main'>
            <ErrorBoundary>
            {this.renderRoutes()}  
            </ErrorBoundary>
          <LoadingSpinner />
          </main>
       </RemindersContext.Provider>
        <footer>
          <p>
          © k.d. Bromley 2021  ||  See the <a href='https://github.com/kdbromley/minder-app' rel='noreferrer' className='footer__link' target='_blank'>Github Repo</a>! <br /> 
          Button icons from <a href='https://feathericons.com/' rel='noreferrer' className='footer__link' target='_blank'>Feather</a> icon collection.
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
