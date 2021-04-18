import { Component } from 'react';
import { Link } from 'react-router-dom';
//import SearchBar from '../SearchBar/SearchBar';   //future feature
import './Navbar.css';

export default class Navbar extends Component {
    render() {
        return (
            <nav className='Navbar__container'>
                
                <h1 className='Navbar__app-title'><Link to='/' aria-label='minder app home page'>'minder</Link></h1>
                <Link to='/reminders' className='Navbar__link all' aria-label='All Reminders'>All</Link>
                <Link to='/add-reminder' className='Navbar__link new' aria-label='Create New Reminder'>New</Link>
            </nav>
        )
    }
}