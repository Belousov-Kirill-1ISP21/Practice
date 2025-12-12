import styles from './css/appStyle.module.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes'; 

function App() {

  return (
    
    <div className={styles.App}>
        <Router>
          <Routes />
        </Router>
    </div>
  );
}

export default App;

