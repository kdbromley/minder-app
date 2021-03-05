import { Link } from 'react-router-dom';
import ReminderCard from '../ReminderCard/ReminderCard';
import './LandingPage.css';

export default function LandingPage(props) {
    return (
        <div className='LandingPage'>
            <h2>What's due today?</h2>
              {props.reminders.map(reminder =>
                <ReminderCard reminder={reminder} key={reminder.id}/>
              )}
            <Link to='/reminders' className='LandingPage__link'>See My Reminders &#10142;</Link>
        </div>
    )
}

LandingPage.defaultProps = {
  reminders: [],
}