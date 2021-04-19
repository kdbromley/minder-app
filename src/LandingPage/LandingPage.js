import { Link } from 'react-router-dom';
import ReminderCard from '../ReminderCard/ReminderCard';
import './LandingPage.css';

export default function LandingPage(props) {
    return (
      <div className='LandingPage__container'>
        <h2>What's due today?</h2>
        <div className='LandingPage__wrapper'>
          {props.reminders.length !== 0
          ? props.reminders.map(reminder =>
            <Link to={`/reminders/${reminder.id}`} key={reminder.id} className='LandingPage__link reminder-card'>
              <ReminderCard reminder={reminder} key={reminder.id} />
            </Link>
          )
          : <>    
            <h3 className='LandingPage__notif'>Nothing!</h3>
            <span aria-hidden='true' className='unicode__check'>&#10003;</span>
            </>
          }
        </div>
        <Link to='/reminders' aria-label='All My Reminders' className='LandingPage__link blue-string'>All My Reminders &#10142;</Link>
      </div>
    )
}

LandingPage.defaultProps = {
  reminders: [],
}