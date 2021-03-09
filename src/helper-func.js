import { parse, formatISO } from 'date-fns';

export const convertDateTime = (date, time, ampm) => {
    const dateTime = date + ' ' + time + ' ' + ampm;
    const parsedDateTime = parse(dateTime, 'MM/dd/yyyy h:mm a', new Date())
    const formattedDateTime = formatISO(parsedDateTime)
    return formattedDateTime
}

export let hourArray = ['12:00', '12:30', '1:00', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30']

export const formatDate = (date) => {
    const jsDate = new Date(date);
    const dateFormat = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });
    return dateFormat.format(jsDate)
}