import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { portfolioData } from './data/mock';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header portfolioData={portfolioData} />
        <main>
          <Hero portfolioData={portfolioData} />
          <About portfolioData={portfolioData} />
          <Experience portfolioData={portfolioData} />
          <Projects portfolioData={portfolioData} />
          <Contact portfolioData={portfolioData} />
        </main>
        <Footer portfolioData={portfolioData} />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;