import deleteIcon from '../images/trash-2.svg'
import checkCircleIcon from '../images/check-circle.svg';
import checkIcon from '../images/check.svg';
import editIcon from '../images/edit.svg';
import addIcon from '../images/plus-circle.svg';
import cancelIcon from '../images/x-circle.svg';
import './Button.css';

export default function Button(props) {
   //this function will identify what icon to render
  let renderIcon = () => { 
   switch(props.label) {
      case 'Delete': return <img src={deleteIcon} alt='Delete Reminder Icon' />;
      case 'Check': return <img src={checkCircleIcon} alt='Check Reminder Icon' />;
      case 'Uncheck': return <img src={checkIcon} alt='Uncheck Reminder Icon' />;
      case 'Edit': return <img src={editIcon} alt='Edit Reminder Icon' />;
      case 'Add': return <img src={addIcon} alt='Add Reminder Icon' />;
      case 'Cancel and Go Back': return <img src={cancelIcon} alt='Cancel Icon' />;
      default: return `${props.label}`;
    }
  }

  let type = props.type || 'button'

  return (
    <button type={type} className="Reminder__button" aria-label={`${props.label}`} onClick={props.handleClick}>
      {renderIcon()}
    </button>
  );
}