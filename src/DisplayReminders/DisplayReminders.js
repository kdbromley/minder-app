import { Component } from 'react';
import { Link } from 'react-router-dom';
import RemindersContext from '../RemindersContext';
import ReminderCard from "../ReminderCard/ReminderCard";
import Button from '../Button/Button';
import './DisplayReminders.css';

export default class DisplayReminders extends Component {
    static contextType = RemindersContext;
    
    constructor(props) {
        super(props);
        this.state = {
            reminder: {},
            toggleActive: true,
        }
    }

    toggleRemindersDisplay = (value) => {
        this.setState({ toggleActive: value })
    }

    onDeleteReminder = reminder => {
        this.context.deleteReminder(reminder.id)
        this.props.history.push('/reminders')
    }
    onCheckReminder = reminder => {
        if(reminder.completed === true) {
            this.context.checkReminder(reminder.id)
        } else {
            this.context.uncheckReminder(reminder.id)
        }
        //this.context.checkReminder(reminderId)
        this.props.history.push('/reminders')
    }


    render() {
      const { reminders=[] } = this.context;
      let activeReminders = reminders.filter(reminder => reminder.completed === false)
      let completedReminders = reminders.filter(reminder => reminder.completed === true )
      const remindersToDisplay = this.state.toggleActive ? activeReminders : completedReminders;
        return (
            <div className='Display__container'>
                <h2>Reminders</h2>
                <label htmlFor='incomplete'>Incomplete <input type='radio' id='incomplete' name='toggleDisplay' defaultChecked onClick={() => this.toggleRemindersDisplay(true)}/></label>
                <label htmlFor='complete'>Complete <input type='radio' id='complete' name='toggleDisplay' onClick={() => this.toggleRemindersDisplay(false)}/></label>
                <div className='Display__reminders-list'>
                  {remindersToDisplay.map(reminder =>
                    <div className='Display__reminder' key={reminder.id}>
                      <Link to={`/reminders/${reminder.id}`} >
                          <ReminderCard reminder={reminder} />
                      </Link>
                      <div className='Display__reminder__buttons'>
                        <Button className='' label='Check' handleClick={() => this.onCheckReminder(reminder)} reminder={reminder}/>
                        <Button className='' label='Delete' handleClick={() => this.onDeleteReminder(reminder)} reminder={reminder}/>
                     </div>
                    </div>
                    )}
                </div>
            </div>
        )
    }
}