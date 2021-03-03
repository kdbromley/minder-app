import { Component } from 'react';
import Button from '../Button/Button';
import './ReminderCard.css'

export default class ReminderCard extends Component {
    static defaultProps = {
        reminder: {}
    }
    
    handleCheck = () => {
        console.log('check clicked')
    }
    handleDelete = () => {
        console.log('delete clicked')
    }
    handleEdit = () => {
        console.log('edit clicked')
    }

    render() {
      const { reminder } = this.props || {};
      const formattedDate = reminder.dueDate.toLocaleString();
        return (
            <>
              <div className='ReminderCard__container'>
                <h4 className='ReminderCard__text'>{reminder.title}</h4>
                <h5>Due Date: {formattedDate}</h5>
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