import React from 'react';

 const RemindersContext = React.createContext({
    events: [],
    currentDate: '',
    addReminder: () => {},
    deleteReminder: () => {},
    editReminder: () => {},
})

export default RemindersContext;
