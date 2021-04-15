import deleteIcon from '../images/trash-2.svg'
import checkIcon from '../images/check-circle.svg';
import './Button.css';

export default function Button(props) {
   //this function will identify what icon to render
  let renderIcon = () => { 
   switch(props.label) {
      case 'Delete': return <img src={deleteIcon} alt='Delete Icon' />;
      case 'Check': return <img src={checkIcon} alt='Check Icon' />;
      case 'Uncheck': return <img src={checkIcon} alt='Uncheck Icon' />;
    }
  }

  return (
    <button className="Reminder__button" onClick={props.handleClick}>
      {renderIcon()}
    </button>
  );
}