import React, { useState, useEffect } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import Home from './templates/Home';
import About from './templates/About';
import Projects from './templates/Projects';
import Project from './templates/Project';
import Skills from './templates/Skills';
import Contact from './templates/Contact';
import './sass/styles.scss';
// import './sass/base/elements/_body.scss'
// import './sass/abstracts/_mixins.scss';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Include the gradient background */}
      <div className="gradient-background"></div>
      <header id="masthead" className="site-header">
        <div className="site-branding">
        </div>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={toggleMenu}>
          Menu
        </button>
        <nav className={`site-navigation ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><NavLink to='/' end>Home</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/projects'>Projects</NavLink></li>
            <li><NavLink to='/skills'>Skills</NavLink></li>
            <li><NavLink to='/contact'>Contact</NavLink></li>
          </ul>
        </nav>
      </header>
      <main id="main">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/project/:id' element={<Project />} />
          <Route path='/skills' element={<Skills />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </main>
      <footer>
        {/* <nav className="site-navigation">
          <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
          </ul>
        </nav> */}
        <p className="copyright">
          Created by <a href="https://chrishoornaert.com/" target="_blank" rel="noopener noreferrer">Chris Hoornaert</a>.
        </p>
      </footer>
    </>
  );
}

export default App;
