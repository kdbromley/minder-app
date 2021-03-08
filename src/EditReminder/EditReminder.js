import React, { useState } from 'react';
import { parse, formatISO } from 'date-fns';

function convertDateTime(date, time, ampm) {
    const dateTime = date + ' ' + time + ' ' + ampm;
    var parsedDateTime = parse(dateTime, 'MM/dd/yyyy h:mm a', new Date())
    var formattedDateTime = formatISO(parsedDateTime)
    console.log(formattedDateTime)
    return formattedDateTime
}


export default function EditReminder(props) {   
    //const [error] = useState('')
    
    const { reminder } = props
    
    const handleSubmit = e => {
        e.preventDefault();
        const { title, date, hour, ampm, notes } = e.target;
        const dueDate = convertDateTime(date.value, hour.value, ampm.value)
        const updatedReminder = {
            'id': reminder.id,
            'title': title.value,
            'due_date': dueDate,
            'reminder_notes': notes.value,
            'completed': false,
        } 
        if(!updatedReminder.title || !updatedReminder.due_date) {
            //setState needs fixing
          return false;
      }
       props.submitEdits(reminder.id, updatedReminder)
    }

    const handleClickCancel = () => {
        props.cancelEdit()
    }

    let hourArray = ['12:00', '12:30', '1:00', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30']

    return (
        <form className='EditReminder__form'
         onSubmit={handleSubmit}>
            <label htmlFor='title'>Reminder: </label>
                    <input id='title' type='text' defaultValue={reminder.title} placeholder={reminder.title}/>
                    <fieldset>
                        <legend>Due:</legend>
                        <label htmlFor='date'>Date: </label>
                        <input id='date' type='text' name='date' pattern='\d{1,2}/\d{1,2}/\d{4}' 
                         defaultValue={reminder.dueDate} placeholder={reminder.dueDate}
                         aria-label='month/day/full year'
                        />
                        <label htmlFor='time' aria-label='choose hour then AM/PM'>Time:</label>
                         <select name='hour' id='hour'>
                            {hourArray.map(hour => {
                                return <option name= 'hour' value={`${hour}`}>{hour}</option>}
                            )}
                         </select>
                         <select name='ampm' id='ampm'>
                            <option name='ampm' value='AM'>AM</option>
                            <option name='ampm' value='PM'>PM</option>
                         </select>
                    </fieldset>
                    <label htmlFor='notes'>Notes:</label>
                    <input id='notes' type='textarea' rows='4' cols='15' 
                     defaultValue={reminder.notes} placeholder={reminder.notes} 
                    /> 
                    <div className='AddReminder__button-container'>
                      <button type='submit' className='AddReminder__button'>Submit</button>
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