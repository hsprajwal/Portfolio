import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import ModernPortfolio from './components/ModernPortfolio';
import { portfolioData } from './data/portfolioData';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ModernPortfolio data={portfolioData} />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;