import React from 'react';
//import { useState } from 'react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import { convertToISO, formatAMPMForForm, formatDateForForm, formatTimeForForm, hourArray } from '../helper-func';
import config from '../config';
import './EditReminder.css';

export default function EditReminder(props) {   
  //const [error] = useState('')     //form input errors for user information, will add feature in styling
  
  const { reminder } = props;
  
  const handleSubmit = e => {
    e.preventDefault();
    const { title, due_date, hour, ampm, notes } = e.target;
    const dueDate = convertToISO(due_date.value, hour.value, ampm.value)
    const updatedReminder = {
      'id': reminder.id,
      'title': title.value,
      'due_date': dueDate,
      'reminder_notes': notes.value,
      'completed': false,             
      //no user_id field for editing
    } 
    if(!updatedReminder.title || !updatedReminder.due_date) {
        //setState needs implementation for error message
      return false;
    } 

    fetch(config.API_BASE_URL + config.REMINDERS_ENDPOINT + `/${reminder.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedReminder)
      })
      .then(response => {
      if (!response.ok) {
        return response.json().then(e => Promise.reject(e))
      }
    })
    .then(() => {
      props.submitEdits(reminder.id, updatedReminder)
    })
    .catch(err => {
      console.error(err)
    })
  }

  const handleClickCancel = () => {
      props.cancelEdit()
  }
  
  const date = formatDateForForm(reminder.due_date)
  const hour = formatTimeForForm(reminder.due_date)
  const ampm = formatAMPMForForm(reminder.due_date)

  return (
    <form className='EditReminder__form'
     onSubmit={handleSubmit} >
      <label htmlFor='title'>Reminder:
        <input id='title' type='text' 
        defaultValue={reminder.title} placeholder={reminder.title}/>
      </label>
      <fieldset aria-label='due date and time'>
        <label htmlFor='due_date'>Date:
          <input id='due_date' type='date' name='date'
            defaultValue={date} />
        </label>

        <label htmlFor='time-due'>
          Time Due:
          <span className='EditReminder__time-inputs'>
          <select name='hour' id='hour' 
          aria-label='select hour' defaultValue={`${hour}`}>
            {hourArray.map(hour => {
              return <option key={hour} name='hour' value={`${hour}`}>{hour}</option>}
            )}
          </select>
          <select name='ampm' id='ampm' defaultValue={`${ampm}`}
          aria-label='select a.m. or p.m.'>
            <option name='am' value='AM'>A.M.</option>
            <option name='pm' value='PM'>P.M.</option>
          </select>
          </span>
        </label>
      </fieldset>

      <label htmlFor='notes'>
        Notes:
        <input id='notes' type='textarea' rows='4' cols='15' 
          defaultValue={reminder.reminder_notes} 
          placeholder={reminder.reminder_notes} /> 
      </label>
      <div className='EditReminder__button-container'>
        <Button type='submit' className='EditReminder__button submit' 
        label='Confirm Edit' />
        <Button className='EditReminder__button cancel' 
        label='Cancel and Go Back'
        handleClick={handleClickCancel} />
      </div>
    </form>
  )
}

EditReminder.defaultProps = {
  submitEdits: () => {},
  cancelEdit: () => {},
  reminder: {},
}

EditReminder.propTypes = {
  reminder: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    due_date: PropTypes.string.isRequired,
    reminder_notes: PropTypes.string,
    completed: PropTypes.bool.isRequired,
    user_id: PropTypes.number.isRequired,
  }).isRequired,
  submitEdits: PropTypes.func
}