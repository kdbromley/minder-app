import React from 'react';

 const RemindersContext = React.createContext({
    reminders: [],
    currentDate: '',
    addReminder: () => {},
    deleteReminder: () => {},
    editReminder: () => {},
})

export default RemindersContext;
