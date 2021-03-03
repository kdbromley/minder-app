import React from 'react';

 const RemindersContext = React.createContext({
    events: [],
    currentDate: '',
})

export default RemindersContext;
