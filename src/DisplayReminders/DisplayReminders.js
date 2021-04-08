import { Component } from 'react';
import { Link } from 'react-router-dom';
import RemindersContext from '../RemindersContext';
import ReminderCard from "../ReminderCard/ReminderCard";
import Button from '../Button/Button';
import config from '../config';
import './DisplayReminders.css';

export default class DisplayReminders extends Component {
  static contextType = RemindersContext;
  static defaultProps = {
    match: {
      params: {}
    },
  }
  
  constructor(props) {
    super(props);
    this.state = {
      toggleActive: true,
    }
  }

  toggleRemindersDisplay = (value) => {
    this.setState({ toggleActive: value })
  }

  onDeleteReminder = reminder => {
    const reminderId = reminder.id
    console.log(reminderId)
    fetch(config.API_BASE_URL + config.REMINDERS_ENDPOINT + `/${reminderId}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(e => Promise.reject(e))
        }
      })
      .then(() => {
        this.context.deleteReminder(reminderId)
        this.props.history.push('/reminders')
      })
      .catch(err => {
        console.error(err)
      })
  }
  onCheckReminder = (reminder) => {
    const data = { completed: true }
    console.log(reminder.id)

   /* fetch(config.API_BASE_URL + config.REMINDERS_ENDPOINT + `/${reminder.id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(e => Promise.reject(e))
        }
      })
      .then(() => {
        this.context.checkReminder(reminder.id)
        this.props.history.push('/reminders')
      })
      .catch(err => {
        console.error(err)
      }) */
  }

  onUncheckReminder = (reminder) => {
    const data = { completed: false }
    console.log(reminder.id)

    fetch(config.API_BASE_URL + config.REMINDERS_ENDPOINT + `/${reminder.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
     })
      .then(response => {
        if (!response.ok) {
          return response.json().then(e => Promise.reject(e))
        }
      })
      .then(() => {
        this.context.uncheckReminder(reminder.id)
        this.props.history.push('/reminders')
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const { reminders=[] } = this.context;
    let activeReminders = reminders.filter(reminder => reminder.completed == false)
    let completedReminders = reminders.filter(reminder => reminder.completed == true )
    const remindersToDisplay = this.state.toggleActive ? activeReminders : completedReminders;
    return (
      <div className='Display__container'>
        <h2>Reminders</h2>
        <label htmlFor='incomplete'>Incomplete <input type='radio' id='incomplete' name='toggleDisplay' defaultChecked onClick={() => this.toggleRemindersDisplay(true)}/></label>
        <label htmlFor='complete'>Complete <input type='radio' id='complete' name='toggleDisplay' onClick={() => this.toggleRemindersDisplay(false)}/></label>
        <div className='Display__reminders-list'>
          {remindersToDisplay.map(reminder =>
          <div className='Display__reminder' key={reminder.id}>
            <Link to={`/reminders/${reminder.id}`} >
                <ReminderCard reminder={reminder} />
            </Link>
            <div className='Display__buttons'>
              {reminder.completed
              ? <Button className='Display__button uncheck' label='Uncheck' handleClick={() => this.onUncheckReminder(reminder)} />
              : <Button className='Display__button check' label='Check' handleClick={() => this.onCheckReminder(reminder)} /> 
              }
              <Button className='Display__button delete' label='Delete' handleClick={() => this.onDeleteReminder(reminder)} reminder={reminder}/>
            </div>
          </div>
          )}
        </div>
      </div>
    )
  }
}

