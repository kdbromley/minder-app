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
    const formattedToday = new Intl.DateTimeFormat('en-US', {month: '2-digit', day: '2-digit', year: 'numeric' }).format(today); 
    this.setState({ currentDate: formattedToday })
  }

  componentDidMount() {
    let today = new Date()
    let reminders = STORE.reminders
    this.loadReminders(reminders)
    this.getTodayDate(today)
  }

  handleAddReminder = reminder => {
    console.log(reminder)
    this.setState({ reminders: [...this.state.reminders, reminder] })
    console.log(this.state.reminders)
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
    this.state.reminders.find(reminder => reminder.id === reminderId)["checked"] = "true"
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
    console.log('app render', this.state.reminders)
    const contextValue = {
      reminders: this.state.reminders,
      currentDate: this.state.currentDate,
      addReminder: this.handleAddReminder,
      deleteReminder: this.handleDeleteReminder,
      editReminder: this.handleEditReminder,
      checkReminder: this.handleCheckReminder,
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
