import React from 'react';

 const RemindersContext = React.createContext({
    reminders: [],
    currentDate: '',
    addReminder: () => {},
    deleteReminder: () => {},
    editReminder: () => {},
    checkReminder: () => {},
    uncheckReminder: () => {},
})

export default RemindersContext;
