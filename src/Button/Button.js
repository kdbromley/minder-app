import './Button.css';

export default function(props) {
    return (
      <button className="button" onClick={props.handleClick}>
        {props.label}
      </button>
    );
}