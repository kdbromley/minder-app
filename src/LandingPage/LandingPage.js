import { Link } from 'react-router-dom';
import ReminderCard from '../ReminderCard/ReminderCard';
import './LandingPage.css';

export default function LandingPage(props) {
    return (
      <div className='LandingPage__container'>
        <h2>What's due today?</h2>
          {props.reminders.length !== 0
          ? props.reminders.map(reminder =>
            <ReminderCard reminder={reminder} key={reminder.id}/>
          )
          : <div className='LandingPage__wrapper'>
              <h3 className='LandingPage__notif'>Nothing!</h3>
              <span aria-hidden='true' className='unicode__check'>&#10003;</span>
            </div>
          }
        <Link to='/reminders' aria-label='All My Reminders' className='LandingPage__all-link'>All My Reminders &#10142;</Link>
      </div>
    )
}

LandingPage.defaultProps = {
  reminders: [],
}