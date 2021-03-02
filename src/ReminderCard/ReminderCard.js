import { Component } from 'react';
import './ReminderCard.css'

export default class EventCard extends Component {
    render() {
        return (
            <div className='ReminderCard__container'>
                <h4 className='ReminderCard__text'>Reminder Title</h4>
                <h5>Due Date: 1/1/70 12:00pm</h5>
            </div>
        )
    }
}