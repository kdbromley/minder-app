import React from 'react';

 const RemindersContext = React.createContext({
    events: [],
    currentDate: '',
    addReminder: () => {},
})

export default RemindersContext;
