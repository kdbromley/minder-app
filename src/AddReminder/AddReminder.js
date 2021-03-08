import { Component } from 'react';
import { v4 as uuid } from 'uuid';
import RemindersContext from '../RemindersContext';
import ValidationError from '../ValidationError';
import { parse, formatISO } from 'date-fns';
import './AddReminder.css';

function convertDateTime(date, time, ampm) {
    const dateTime = date + ' ' + time + ' ' + ampm;
    var parsedDateTime = parse(dateTime, 'MM/dd/yyyy h:mm a', new Date())
    console.log(parsedDateTime)
    var formattedDateTime = formatISO(parsedDateTime)
    return formattedDateTime

}

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
        const { title, date, hour, ampm,  notes } = e.target
        const dueDate = convertDateTime(date.value, hour.value, ampm.value)
        const newReminder = {
          'id': uuid(),
          'title': title.value,
          'due_date': dueDate,
          'reminder_notes': notes.value,
          'completed': false,
          'user_id': 1
        } 
        if(!newReminder.title || !newReminder.due_date) {
              this.setState({ error: 'Title and date are required'})
            return false;
        }
         this.context.addReminder(newReminder)
         this.props.history.push('/')
         
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
    validateDueDate() {
        const date = this.state.date.value.trim();
        const touched = this.state.date.touched;
        if (touched === true && date.length === 0) {
            return 'Due date is required'
        } 
    }
    

    render() {
        let hourArray = ['12:00', '12:30', '1:00', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30']
        return (
            <div className='AddReminder__container'>
                {this.state.error && <ValidationError message={this.state.error} /> }
                <form className='AddReminder__form'
                 onSubmit={this.handleSubmit}>
                    <label htmlFor='title'>Reminder: </label>
                    <input id='title' type='text' placeholder='Water Plants' required 
                     onChange={e => this.updateTitle(e.target.value)} />
                     <ValidationError message={this.validateTitle()} />
                    <fieldset>
                        <legend>Due:</legend>
                        <label htmlFor='date'>Date: </label>
                        <input id='date' type='text' name='date' 
                        pattern='\d{1,2}/\d{1,2}/\d{4}' placeholder='mm/dd/yyyy' 
                        aria-label='month/day/full year' required
                         onChange={e => this.updateDueDate(e.target.value)}/>
                        <label htmlFor='time' aria-label='choose hour then AM/PM'>Time:</label>
                        <select name='hour' id='hour'>
                            {hourArray.map(hour => {
                                return <option name= 'hour' value={`${hour}`}>{hour}</option>}
                            )}
                        </select>
                        <select name='ampm' id='ampm'>
                            <option name='ampm' value='AM'>AM</option>
                            <option name='ampm' value='PM'>PM</option>
                        </select>
                         <ValidationError message={this.validateDueDate()} />
                    </fieldset>
                    <label htmlFor='notes'>Notes:</label>
                    <input id='notes' type='textarea' rows='4' cols='15' placeholder='Fern gets 2 cups, flowers 1 cup each, spritz water on flowers' /> 
                    <div className='AddReminder__button-container'>
                      <button type='submit' className='AddReminder__button'>Create</button>
                      <button type='button' className='AddReminder__button'
                       onClick={this.handleClickCancel}>
                          Cancel
                      </button>
                    </div>
                </form>
            </div>
        )
    }
}