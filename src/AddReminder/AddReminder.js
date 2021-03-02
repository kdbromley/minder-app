
import './AddReminder.css';

export default function AddReminder() {
    return (
        <div className='AddReminder__container'>
            <form className='AddReminder__form'>
                <label htmlFor='title'>Reminder: </label>
                <input id='title' type='text' placeholder='Water Plants' />
                <fieldset>
                    <legend>Due:</legend>
                    <label htmlFor='date-due'>Date: </label>
                    <input id='date-due' type='text' name='date' pattern='\d{1,2}/\d{1,2}/\d{4}' placeholder='mm/dd/yyyy' aria-label='month/day/full year'/>
                    <label htmlFor='time-due'>Time:</label>
                    <input id='time-due' type='time'  />  {/* during styling update to text pattern with regex OR select option */}
                </fieldset>
                <label htmlFor='reminder-notes'>Notes:</label>
                <input id='reminder-notes' type='textarea' rows='4' cols='15' placeholder='Fern gets 2 cups, flowers 1 cup each, spritz water on flowers' /> 
            </form>
        </div>
    )
}