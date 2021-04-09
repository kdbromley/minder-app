import { parse, formatISO, parseISO } from 'date-fns';

export const convertToISO = (date, time, ampm) => {
    const dateTime = date + ' ' + time + ' ' + ampm;
    const parsedDateTime = parse(dateTime, 'MM/dd/yyyy h:mm a', new Date())
    const ISODateTime = formatISO(parsedDateTime)
    return ISODateTime
}

export const convertToReadable = (date) => {
    const fullDate = parseISO(date)
    const condensedDate = fullDate.toString().slice(0, 24)
    //const readableDate = parse(condensedDate, 'E..EEE MMM dd yyyy HH:mm:ss', new Date())
    //return readableDate; 
    return condensedDate      //more readable formatting will be completed during styling
}

export let hourArray = ['12:00', '12:30', '1:00', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30']

export const findReminder = (reminders, reminderId) => {
    return reminders.find(reminder => reminder.id == reminderId)
}