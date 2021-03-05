import React from 'react';
import { Link, Route } from 'react-router-dom';
import DisplayReminders from './DisplayReminders/DisplayReminders';
import Sidebar from './Sidebar/Sidebar';
import ReminderPage from './ReminderPage/ReminderPage';
import AddReminder from './AddReminder/AddReminder';
import LandingPage from './LandingPage/LandingPage';
import { STORE } from './dummy-store';
import RemindersContext from './RemindersContext';
import './App.css';

class App extends React.Component {
  state = {
    reminders: [],
    currentDate: '',
  }

  loadReminders = reminders => {
      this.setState({ reminders: reminders })
  }
  getTodayDate = today => {
    this.setState({ today: today })
  }


  componentDidMount() {
    let today = new Date().toDateString()
    let reminders = STORE.reminders
    this.loadReminders(reminders)
    this.getTodayDate(today)
  }

  handleAddReminder = (reminder) => {
    console.log(reminder)
    this.setState({
      reminders: [...this.state.reminders, reminder]
    })
  }

  handleDeleteReminder = reminderId => {
    this.setState({
      reminders: this.state.reminders.filter(reminder => reminder.id !== reminderId)
    })
  }

  handleEditReminder = (reminderId, updatedReminder) => {
    const matchId = (reminder) => ( reminder.id === reminderId ) 
    const index = this.state.reminders.findIndex(matchId)
    this.state.reminders.splice(index, 1, updatedReminder)
  }
  
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
       exact
       path='/reminders'
       component={DisplayReminders}
      />
      <Route
       path='/reminders/:reminderId'
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
    const contextValue = {
      reminders: this.state.reminders,
      currentDate: this.state.currentDate,
      addReminder: this.handleAddReminder,
      deleteReminder: this.handleDeleteReminder,
      editReminder: this.handleEditReminder,
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
            {this.renderRoutes()}
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
