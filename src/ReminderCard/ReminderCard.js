import { Component } from 'react';
import RemindersContext from '../RemindersContext';
import './ReminderCard.css'

export default class ReminderCard extends Component {
  static contextType = RemindersContext;  
  static defaultProps = {
        reminder: {},
    }
  

    render() {
      const { reminder } = this.props || {};
        return (
            <>
              <div className='ReminderCard__container'>
                <h4 className='ReminderCard__text'>{reminder.title}</h4>
                <h5>Due Date: {reminder.dueDate}</h5>
              </div>
            </>
        )
    }
}