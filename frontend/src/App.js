import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import PremiumPortfolio from './components/PremiumPortfolio';
import { portfolioData } from './data/portfolioData';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <PremiumPortfolio data={portfolioData} />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;