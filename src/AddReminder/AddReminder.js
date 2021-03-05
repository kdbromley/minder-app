import { Component } from 'react';
import { v4 as uuid } from 'uuid';
import RemindersContext from '../RemindersContext';
import ValidationError from '../ValidationError';
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
        e.preventDefault()
        const { title, date, notes } = e.target
        const newReminder = {
          'id': uuid(),
          'title': title.value,
          'dueDate': date.value,
          'notes': notes.value,
          'checked': false,
        } 
        if(!newReminder.title || !newReminder.dueDate) {
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
        return (
            <div className='AddReminder__container'>
                {this.state.error && <ValidationError message={this.state.error} /> }
                <form className='AddReminder__form'
                 onSubmit={this.handleSubmit}
                >
                    <label htmlFor='title'>Reminder: </label>
                    <input id='title' type='text' placeholder='Water Plants' 
                     onChange={e => this.updateTitle(e.target.value)} />
                     <ValidationError message={this.validateTitle()} />
                    <fieldset>
                        <legend>Due:</legend>
                        <label htmlFor='date'>Date: </label>
                        <input id='date' type='text' name='date' pattern='\d{1,2}/\d{1,2}/\d{4}' placeholder='mm/dd/yyyy' aria-label='month/day/full year' 
                         onChange={e => this.updateDueDate(e.target.value)}/>
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