import { Component } from 'react';
import { Link } from 'react-router-dom';
import RemindersContext from '../RemindersContext';
import ReminderCard from "../ReminderCard/ReminderCard";
import Button from '../Button/Button';
import './DisplayReminders.css'

export default class DisplayReminders extends Component {
    static contextType = RemindersContext;
    static defaultProps = {
        match: {
          params: {}
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            reminder: {},
        }
    }

    onDeleteReminder = reminder => {
        const reminderId = reminder.id;
        this.context.deleteReminder(reminderId)
        this.props.history.push('/reminders')
    }

    render() {
      const { reminders=[] } = this.context;
        return (
            <div className='Display__container'>
                <h2>Upcoming Reminders</h2>
                <div className='Display__reminders-list'>
                    {reminders.map(reminder =>
                    <div className='Display__reminder' key={reminder.id}>
                      <Link to={`/reminders/${reminder.id}`} >
                          <ReminderCard reminder={reminder} />
                      </Link>
                      <div className='Display__reminder__buttons'>
                        <Button className='' label='Check' handleClick={this.handleCheck} reminder={reminder}/>
                        <Button className='' label='Delete' handleClick={() => this.onDeleteReminder(reminder)} reminder={reminder}/>
                     </div>
                   </div>
                    )}
                </div>
            </div>
        )
    }
}