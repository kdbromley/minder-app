import { parse, formatISO, parseISO, format } from 'date-fns';

export const convertToISO = (date, time, ampm) => {
    const dateTime = date + ' ' + time + ' ' + ampm;
    const parsedDateTime = parse(dateTime, 'yyyy-MM-dd h:mm a', new Date())
    const ISODateTime = formatISO(parsedDateTime)
    return ISODateTime
}

export const formatTimeForDisplay = (date) => format(parseISO(date), 'h:mm bbb')
export const formatDateForDisplay = (date) => format(parseISO(date), 'MM/dd/yyyy')

export const formatDateForForm = (date) => format(parseISO(date), 'yyyy-dd-MM')
export const formatTimeForForm = (date) => format(parseISO(date), 'h:mm')
export const formatAMPMForForm = (date) => format(parseISO(date), 'a')

export let hourArray = ['12:00', '12:30', '1:00', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30']

export const findReminder = (reminders, reminderId) => {
    const idNum = parseInt(reminderId)
    return reminders.find(reminder => reminder.id === idNum)
}