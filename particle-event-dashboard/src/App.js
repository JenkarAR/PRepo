import React from 'react';
import './App.css';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Particle Event Dashboard</h1>
      </header>
      <div className="content">
        <Dashboard />
      </div>
      <footer className="footer">
        <p>Powered by Particle Data Visualization</p>
      </footer>
    </div>
  );
}

export default App;
