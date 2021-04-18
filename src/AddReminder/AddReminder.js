import { Component } from 'react';
import RemindersContext from '../RemindersContext';
import ValidationError from '../ValidationError';
import Button from '../Button/Button';
import { convertToISO, hourArray } from '../helper-func';
import config from '../config';
import './AddReminder.css';


export default class AddReminder extends Component {
  static contextType = RemindersContext;
  
  constructor(props) {
    super(props)
    this.state = {
      title: {
        value: '',
        touched: false,
      },
      date: {
        value: '',
        touched: false,
      },
      error: null,
    }
  } 
  
  handleSubmit = e => {
    e.preventDefault();
    const { title, due_date, hour, ampm,  notes } = e.target
    const dueDate = convertToISO(due_date.value, hour.value, ampm.value)
    const newReminder = {
      'title': title.value,
      'due_date': dueDate,
      'reminder_notes': notes.value,
      'completed': false,
      'user_id': 1          //default user_id for dummyuser 
    } 
    
    if(!newReminder.title || !newReminder.due_date) {
      this.setState({ error: 'Title and date are required'})
      return false;
    }
    fetch(config.API_BASE_URL + config.REMINDERS_ENDPOINT, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReminder)
     })
     .then(response => {
       if (!response.ok) {
        return response.json().then(e => Promise.reject(e))
      }
      return response.json()
     })
     .then(res => {
       newReminder.id = res.id;
       this.context.addReminder(newReminder)
       this.props.history.push('/reminders')
      })
     .catch(err => {
       console.error(err)
      })
  }


  handleClickCancel = () => {
    this.props.history.push('/')
  };

  updateTitle(title) {
    this.setState({
      title: {
        value: title,
        touched: true
      }
    });
  }
  updateDueDate(date) {
    console.log(date)
    this.setState({
      date: {
        value: date,
        touched: true
      }
    });
  }

  validateTitle() {
    const title = this.state.title.value.trim();
    const touched = this.state.title.touched;
    if (touched === true && title.length === 0) {
        return 'Title is required'
      } 
  }
  

  render() {
    return (
      <div className='AddReminder__container'>
        {this.state.error && <ValidationError message={this.state.error} /> }
        <form className='AddReminder__form'
         onSubmit={this.handleSubmit}>
          <label htmlFor='title'>Reminder: 
           <input id='title' type='text' 
            placeholder='Water Plants' required 
            onChange={e => this.updateTitle(e.target.value)} />
          </label>

          <ValidationError message={this.validateTitle()} />
          
          <fieldset>
            <legend aria-label='Due date/time'></legend>

            <label htmlFor='due_date' className='add-space'>
              Due Date: 
              <input id='due_date' type='date' name='date' required />
            </label>
            

            <label htmlFor='time-due'>
              Time Due:
              <span className='AddReminder__time-inputs'>
              <select name='hour' id='hour' aria-label='select hour'>
                {hourArray.map(hour => {
                  return <option key={hour} name='hour' value={`${hour}`}>{hour}</option>}
                )}
              </select>
              <select name='ampm' id='ampm' aria-label='select am or pm'>
                <option name='am' value='AM'>A.M.</option>
                <option name='pm' value='PM'>P.M.</option>
              </select>
             </span>
            </label>

            <ValidationError message={this.state.error} />
          </fieldset>

          <label htmlFor='notes'>
            Notes:
           <input id='notes' name='notes'
           type='textarea' rows='4' cols={20}
           wrap='soft' />
          </label>
          
          <div className='AddReminder__button-container'>
            <Button type='submit' className='AddReminder__button add' label='Add' />
            <Button className='AddReminder__button cancel' label='Cancel and Go Back'
             onClick={this.handleClickCancel} />
          </div>
        </form>
      </div>
    )
  }
}