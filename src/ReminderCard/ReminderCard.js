import { Component } from 'react';
import RemindersContext from '../RemindersContext';
import './ReminderCard.css';
import { convertToReadable } from '../helper-func';

export default class ReminderCard extends Component {
  static contextType = RemindersContext;  
  static defaultProps = {
        reminder: {},
    }
  

    render() {
      const { reminder } = this.props || {};
      const readableDate = convertToReadable(reminder.due_date)
        return (
            <>
              <div className='ReminderCard__container'>
                <h4 className='ReminderCard__text'>{reminder.title}</h4>
                <h5>Due Date: {readableDate}</h5>
                <div className='ReminderCard__check'>
                  {(reminder.completed === "true") && 
                    <p>&#10003;</p>}
                </div>
              </div>
            </>
        )
    }
}