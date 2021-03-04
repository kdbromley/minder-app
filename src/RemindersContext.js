import React from 'react';

 const RemindersContext = React.createContext({
    events: [],
    currentDate: '',
    addReminder: () => {},
    deleteReminder: () => {},
})

export default RemindersContext;
