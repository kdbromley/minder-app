import { Component } from "react";
import EditReminder from "../EditReminder/EditReminder";
import ReminderCard from '../ReminderCard/ReminderCard';
import RemindersContext from "../RemindersContext";
import Button from '../Button/Button'
import { findReminder } from '../helper-func';
import './ReminderPage.css'


export default class ReminderPage extends Component {
    static contextType = RemindersContext;
    static defaultProps = {
        match: {
          params: {}
        },
    }

    constructor(props) {
        super(props);
        this.state = {
            displayEditReminder: false
        }
    }

    onDeleteReminder = e => {
        e.preventDefault()
        const { reminderId } = this.props.match.params || {}
        this.context.deleteReminder(reminderId)
        this.props.history.push('/reminders')
    }
    onEditReminder = () => {
        this.setState({ displayEditReminder: true })
    }
    onCancelEdit = () => {
        this.setState({ displayEditReminder: false })
    }
    onEditSubmission = (reminderId, updatedReminder) => {
        this.context.editReminder(reminderId, updatedReminder)
        this.setState({ displayEditReminder: false })
        this.props.history.push(`/reminders/${reminderId}`)
    }
    onCheckReminder = (reminder) => {
        if(reminder.completed === true) {
            this.context.checkReminder(reminder.id)
        } else {
            this.context.uncheckReminder(reminder.id)
        }
        //this.context.checkReminder(reminder.id)
        this.props.history.push('/reminders')
    }

    render() {
        const { reminderId } = this.props.match.params;
        console.log(reminderId)
        const  { reminders=[] } = this.context;
        console.log(reminders)
        const reminder = findReminder(reminders, reminderId)
        console.log(reminder)

        if(!reminder) {
        return (
            <h2>404 reminder not found</h2>
        )
        } else {
        return(
            <div className='ReminderPage__reminder-container'>
                <ReminderCard reminder={reminder} />
                <div className='Reminder__buttons'>
                    <Button className='' label='Check' handleClick={this.onCheckReminder} />
                    <Button className='' label='Delete' handleClick={() => this.onDeleteReminder(reminder)} />
                    <Button className='' label='Edit' handleClick={this.onEditReminder} />
                </div>
                <h6>Notes</h6>
                <p>{reminder.content}</p>
                {this.state.displayEditReminder &&
                   <EditReminder submitEdits={this.onEditSubmission} reminder={reminder}                  
                   cancelEdit={this.onCancelEdit}
                   />
                }
            </div>
        )
    }
}
}