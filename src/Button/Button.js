import './Button.css';

export default function Button(props) {
    return (
      <button className="button" onClick={props.handleClick}>
        {props.label}
      </button>
    );
}