import React from 'react';
import './App.css';
import './Buttons.scss';
import Vehicles from './components/Vehicles';

import Notification from './ui/Notification';

import {useSelector} from 'react-redux';

function App() {
  const notification = useSelector(state => state.ui.notification);

  return (
    <div className="App">
        {notification && <Notification status={notification.status} title={notification.title}
         message={notification.message}/>}
        <Vehicles />
    </div>
  );
}

export default App;
