import './Button.css';

export default function Button(props) {
    return (
      <button className="Reminder__button" onClick={props.handleClick}>
        {props.label}
      </button>
    );
}