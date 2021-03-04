import { Component } from 'react';
import Button from '../Button/Button';
import RemindersContext from '../RemindersContext';
import './ReminderCard.css'

export default class ReminderCard extends Component {
  static contextType = RemindersContext;  
  static defaultProps = {
        reminder: {},
        deleteReminder: () => {},
    }
    
    handleCheck = () => {
        console.log('check clicked')
    }
    handleDelete = e => {
      e.preventDefault()
      const reminderId = this.props.reminder.id
      this.context.deleteReminder(reminderId)
      this.props.deleteReminder(reminderId)
  }
    handleEdit = () => {
        console.log('edit clicked')
    }

    render() {
      const { reminder } = this.props || {};
        return (
            <>
              <div className='ReminderCard__container'>
                <h4 className='ReminderCard__text'>{reminder.title}</h4>
                <h5>Due Date: {reminder.dueDate}</h5>
              </div>
              <div className='ReminderCard__buttons'>
                <Button className='' label='Check' handleClick={this.handleCheck} />
                <Button className='' label='Delete' handleClick={this.handleDelete} />
                <Button className='' label='Edit' handleClick={this.handleEdit} />
              </div>
            </>
        )
    }
}