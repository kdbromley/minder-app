import deleteIcon from '../images/trash-2.svg'
import checkCircleIcon from '../images/check-circle.svg';
import checkIcon from '../images/check.svg';
import editIcon from '../images/edit.svg';
import './Button.css';

export default function Button(props) {
   //this function will identify what icon to render
  let renderIcon = () => { 
   switch(props.label) {
      case 'Delete': return <img src={deleteIcon} alt='Delete Icon' />;
      case 'Check': return <img src={checkCircleIcon} alt='Check Icon' />;
      case 'Uncheck': return <img src={checkIcon} alt='Uncheck Icon' />;
      case 'Edit': return <img src={editIcon} alt='Edit Icon' />;
      default: return `${props.label}`;
    }
  }

  return (
    <button className="Reminder__button" aria-label={`${props.label}`} onClick={props.handleClick}>
      {renderIcon()}
    </button>
  );
}