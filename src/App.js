import React from 'react';
import { Link } from 'react-router-dom';
import DisplayReminders from './DisplayReminders/DisplayReminders';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1>
            <Link to='/'>Minder</Link>
          </h1>
        </header>
        <main className='App__main'>
          <DisplayReminders />
        </main>
      </div>
    );
  }
}

export default App;
