import { Component } from 'react';
import { Link } from 'react-router-dom';
import RemindersContext from '../RemindersContext';
import ReminderCard from "../ReminderCard/ReminderCard";
import './DisplayReminders.css'

export default class DisplayReminders extends Component {
    static contextType = RemindersContext;

    render() {
      const { reminders } = this.context || {};
        return (
            <div className='Display__container'>
                <h2>Upcoming Reminders</h2>
                <div className='Display__reminders-list'>
                    {reminders.map(reminder =>
                      <Link to={`/reminders/${reminder.id}`} key={reminder.id}><ReminderCard key={reminder.id} reminder={reminder} /></Link>
                    )}
                </div>
            </div>
        )
    }
}