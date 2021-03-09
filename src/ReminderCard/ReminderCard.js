import { Component } from 'react';
import RemindersContext from '../RemindersContext';
import { formatDate } from '../helper-func';
import './ReminderCard.css'

export default class ReminderCard extends Component {
  static contextType = RemindersContext;  
  static defaultProps = {
        reminder: {},
    }
  

    render() {
      const { reminder } = this.props || {};
      const formattedDate = formatDate(reminder.due_date)
        return (
            <>
              <div className='ReminderCard__container'>
                <h4 className='ReminderCard__text'>{reminder.title}</h4>
                <h5>Due Date: {formattedDate}</h5>
                <div className='ReminderCard__check'>
                  {reminder.completed && 
                    <p>&#10003;</p>}
                </div>
              </div>
            </>
        )
    }
}