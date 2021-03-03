import { Component } from 'react';
import Button from '../Button/Button';
import './ReminderCard.css'

export default class EventCard extends Component {
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
        return (
            <>
              <div className='ReminderCard__container'>
                <h4 className='ReminderCard__text'>Reminder Title</h4>
                <h5>Due Date: 1/1/70 12:00pm</h5>
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