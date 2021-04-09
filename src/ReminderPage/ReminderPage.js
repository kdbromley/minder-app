import { Component } from "react";
import EditReminder from "../EditReminder/EditReminder";
import ReminderCard from '../ReminderCard/ReminderCard';
import RemindersContext from "../RemindersContext";
import Button from '../Button/Button'
import { findReminder } from '../helper-func';
import config from '../config';
import './ReminderPage.css';


export default class ReminderPage extends Component {
  static contextType = RemindersContext;
  static defaultProps = {
      match: {
        params: {}
      },
      reminder: {},
  }

  constructor(props) {
    super(props);
    this.state = {
        displayEditReminder: false
    }
  }

  onDeleteReminder = reminder => {
    const reminderId = reminder.id
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
  onEditReminder = () => {
      this.setState({ displayEditReminder: true })
  }
  onCancelEdit = () => {
      this.setState({ displayEditReminder: false })
  }
  onEditSubmission = (reminderId, updatedReminder) => {
      this.context.editReminder(reminderId, updatedReminder)
      this.setState({ displayEditReminder: false })
      this.props.history.push(`/reminders/${reminderId}`)
  }
  onCheckReminder = (reminder) => {
      const data = { completed: true }
      
      fetch(config.API_BASE_URL + config.REMINDERS_ENDPOINT + `/${reminder.id}`, {
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
        })
  }
  onUncheckReminder = (reminder) => {
      const data = { completed: "false" }

      fetch(config.API_BASE_URL + config.REMINDERS_ENDPOINT + `/${reminder.id}`, {
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
          this.context.uncheckReminder(reminder.id)
          this.props.history.push('/reminders')
        })
        .catch(err => {
          console.error(err)
        })
  }

  render() {
    const { reminderId } = this.props.match.params;
    const  { reminders=[] } = this.context;
    const reminder = findReminder(reminders, reminderId)

    if(!reminder) {
    return (
        <h2>404 reminder not found</h2>
    )
    } else {
      return(
        <div className='ReminderPage__reminder-container'>
          <ReminderCard reminder={reminder} />
          <div className='Reminder__buttons'>
            {reminder.completed
             ? <Button className='' label='Uncheck' handleClick={() => this.onUncheckReminder(reminder)} />
             : <Button className='' label='Check' handleClick={() => this.onCheckReminder(reminder)} /> 
            }
            <Button className='' label='Delete' handleClick={() => this.onDeleteReminder(reminder)} />
            <Button className='' label='Edit' handleClick={this.onEditReminder} />
          </div>
          <h6>Notes</h6>
          <p>{reminder.reminder_notes}</p>
          
          {this.state.displayEditReminder &&
            <EditReminder submitEdits={this.onEditSubmission} reminder={reminder}                  
            cancelEdit={this.onCancelEdit}
            />
          }
        </div>
      )
    }
  }
}