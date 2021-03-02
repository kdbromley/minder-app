import Button from '../Button/Button';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <nav className='Sidebar'>
            <div className='Sidebar__buttons-container'>
                <Button />
                <Button />
                <Button />
            </div>
        </nav>
    )
}