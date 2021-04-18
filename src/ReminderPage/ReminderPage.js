import React, { Component } from "react";
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
  handleEditButtonClick = () => {
      this.setState({ displayEditReminder: true })
  }
  onCancelEdit = () => {
      this.setState({ displayEditReminder: false })
  }
  onEditConfirmed = (reminderId, updatedReminder) => {
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
        <div className='ReminderPage__container'>
          <ReminderCard reminder={reminder} className='ReminderPage'/>
          <div className='ReminderPage__reminder-notes'>
            <h6>Notes</h6>
            <p>{reminder.reminder_notes}</p>
          </div>

          {this.state.displayEditReminder &&
            <EditReminder submitEdits={this.onEditConfirmed} reminder={reminder}                  
            cancelEdit={this.onCancelEdit}
            />
          }
          {this.state.displayEditReminder === false &&
          <div className='ReminderPage__buttons-container'>
            {reminder.completed
             ? <Button label='Uncheck' handleClick={() => this.onUncheckReminder(reminder)} />
             : <Button label='Check' handleClick={() => this.onCheckReminder(reminder)} /> 
            }
            <Button label='Delete' handleClick={() => this.onDeleteReminder(reminder)} />
            <Button label='Edit' handleClick={this.handleEditButtonClick} />
          </div>
          }
        </div>
      )
    }
  }
}