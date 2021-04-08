import React, { useState } from 'react';
import { convertToISO, hourArray, convertToReadable } from '../helper-func';
import { format, parse, parseISO } from 'date-fns';
import config from '../config';

export default function EditReminder(props) {   
    //const [error] = useState('')
    
    const { reminder } = props
    
    const handleSubmit = e => {
        e.preventDefault();
        const { title, date, hour, ampm, notes } = e.target;
        const dueDate = convertToISO(date.value, hour.value, ampm.value)
        const updatedReminder = {
            'id': reminder.id,
            'title': title.value,
            'due_date': dueDate,
            'reminder_notes': notes.value,
            'completed': false,             //no user_id field for editing, single dummyuser
        } 
        if(!updatedReminder.title || !updatedReminder.due_date) {
            //setState needs fixing for error message
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

    const parsedDate = parseISO(reminder.due_date)
    const formattedDate = format(parsedDate, 'MM/dd/yyyy')

    return (
        <form className='EditReminder__form'
         onSubmit={handleSubmit}>
            <label htmlFor='title'>Reminder: </label>
                <input id='title' type='text' defaultValue={reminder.title} placeholder={reminder.title}/>
            <fieldset>
                <legend>Due:</legend>
                <label htmlFor='date'>Date: </label>
                <input id='date' type='text' name='date' pattern='\d{1,2}/\d{1,2}/\d{4}' 
                    defaultValue={formattedDate} placeholder={formattedDate}
                    aria-label='month/day/full year'
                />
                <label htmlFor='time' aria-label='choose hour then AM/PM'>Time:</label>
                    <select name='hour' id='hour'>
                    {hourArray.map(hour => {
                        return <option key={hour} name= 'hour' value={`${hour}`}>{hour}</option>}
                    )}
                    </select>
                    <select name='ampm' id='ampm'>
                    <option name='ampm' value='AM'>AM</option>
                    <option name='ampm' value='PM'>PM</option>
                    </select>
            </fieldset>
            <label htmlFor='notes'>Notes:</label>
            <input id='notes' type='textarea' rows='4' cols='15' 
             defaultValue={reminder.reminder_notes} placeholder={reminder.reminder_notes} 
            /> 
            <div className='AddReminder__button-container'>
                <button type='submit' className='AddReminder__button'>
                    Submit
                </button>
                <button type='button' className='AddReminder__button'
                 onClick={handleClickCancel}>
                    Cancel
                </button>
            </div>
        </form>
    )
}

EditReminder.defaultProps = {
    editReminder: () => {},
    reminder: {},
}