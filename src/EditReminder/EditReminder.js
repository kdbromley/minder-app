import React from 'react';

export default function EditReminder(props) {    
    const { reminder } = props
    
    const handleSubmit = e => {
        e.preventDefault();
        const { title, date, notes } = e.target;
        const updatedReminder = {
            'id': reminder.id,
            'title': title.value,
            'dueDate': date.value,
            'notes': notes.value,
            'checked': false,
        } 
        if(!updatedReminder.title || !updatedReminder.dueDate) {
            this.setState({ error: 'Title and date are required'})
          return false;
      }
       props.submitEdits(reminder.id, updatedReminder)
    }

    const handleClickCancel = () => {
        props.cancelEdit()
    }

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