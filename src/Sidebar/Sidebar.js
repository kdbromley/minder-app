import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <nav className='Sidebar'>
            <div className='Sidebar__links-container'>
                <Link to='#' className='Sidebar__link'>Search</Link>
                <Link to='/reminders' className='Sidebar__link'>All Reminders</Link>
                <Link to='/add-reminder' className='Sidebar__link'>New Reminder</Link>
                <Link to='#' className='Sidebar__link'>Archive</Link>
            </div>
        </nav>
    )
}