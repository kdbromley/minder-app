import { Component } from 'react';
import { Link } from 'react-router-dom';
import ReminderCard from "../ReminderCard/ReminderCard";
import './DisplayReminders.css'

export default class Day extends Component {
    render() {
        return (
            <div className='Display__container'>
                <h2>Upcoming Reminders</h2>
                <div className='Display__reminders-list'>
                    <Link to='#'><ReminderCard /></Link>
                </div>
            </div>
        )
    }
}