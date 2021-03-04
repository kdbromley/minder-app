import { Component } from "react";
import ReminderCard from '../ReminderCard/ReminderCard';
import RemindersContext from "../RemindersContext";
import './ReminderPage.css'

function findReminder(reminders, reminderId) {
    return reminders.find(reminder => reminder.id === reminderId)
}

export default class ReminderPage extends Component {
    static contextType = RemindersContext;
    static defaultProps = {
        match: {
          params: {}
        }
    }

    onDeleteReminder = () => {
        this.props.history.push('/reminders')
    }

    render() {
        const { reminderId } = this.props.match.params;
        const  { reminders= [] } = this.context;
        const reminder = findReminder(reminders, reminderId)

        if(!reminder) {
        return (
            <h2>404 reminder not found</h2>
        )
        } else {
        return(
            <div className='ReminderPage__container'>
                <ReminderCard reminder={reminder} deleteReminder={this.onDeleteReminder}/>
                <h6>Notes</h6>
                <p>{reminder.content}</p>
            </div>
        )
    }
}
}