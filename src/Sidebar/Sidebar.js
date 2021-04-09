import { Component } from 'react';
import { Link } from 'react-router-dom';
//import SearchBar from '../SearchBar/SearchBar';   //future feature
import './Sidebar.css';

export default class Sidebar extends Component {


    render() {
        return (
            <nav className='Sidebar'>
                <div className='Sidebar__links-container'>
                    <Link to='/reminders' className='Sidebar__link'>All Reminders</Link>
                    <Link to='/add-reminder' className='Sidebar__link'>New Reminder</Link>
                </div>
            </nav>
        )
    }
}