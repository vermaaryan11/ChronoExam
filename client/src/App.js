import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar, MouseGlow } from './components';
import { AppRoutes } from './routes';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface text-text-primary">
        <MouseGlow />
        <Navbar />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
