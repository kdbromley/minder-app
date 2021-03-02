import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
    return (
        <div className='LandingPage'>
            <h2>What's due today?</h2>
            <Link to='/reminders'>See My Reminders &#10142;</Link>
        </div>
    )
}