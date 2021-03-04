import { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import './Sidebar.css';

export default class Sidebar extends Component {


    render() {
        return (
            <nav className='Sidebar'>
                <div className='Sidebar__links-container'>
                    <Link to='/search' className='Sidebar__link' >Search</Link>
                    <Link to='/reminders' className='Sidebar__link'>All Reminders</Link>
                    <Link to='/add-reminder' className='Sidebar__link'>New Reminder</Link>
                    <Link to='#' className='Sidebar__link'>Archive</Link>
                </div>
            </nav>
        )
    }
}