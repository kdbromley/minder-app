import { Component } from 'react';
import RemindersContext from '../RemindersContext';
import PropTypes from 'prop-types';
import { formattedDateTime } from '../helper-func';
import './ReminderCard.css';

export default class ReminderCard extends Component {
  static contextType = RemindersContext;  
  static defaultProps = {
    reminder: {},
  }
  

  render() {
    const { reminder } = this.props || {};
    const due = formattedDateTime(reminder.due_date)
    return (
      <>
        <div className='ReminderCard__container'>
          <h3 className='ReminderCard__title'>{reminder.title}</h3>
          <h4 className='ReminderCard__due-date'><span>Due:</span> {due}</h4>
        </div>
      </>
    )
  }
}

ReminderCard.propsType = {
  reminder: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    due_date: PropTypes.string.isRequired,
    reminder_notes: PropTypes.string,
    completed: PropTypes.bool.isRequired,
    user_id: PropTypes.number.isRequired
  })).isRequired,
}