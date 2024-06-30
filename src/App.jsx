import React, { useState, useEffect } from 'react';
import { Route, Routes, NavLink, Link } from 'react-router-dom';
import Home from './templates/Home';
import About from './templates/About';
import Projects from './templates/Projects';
import Project from './templates/Project';
// import Skills from './templates/Skills';
import Contact from './templates/Contact';
import Footer from './components/Footer';
import './sass/styles.scss';
import Logo from './assets/images/Portfolio-Logo.svg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
      <div className="gradient-background"></div>
      <header id="masthead" className="site-header">
        <div className="site-branding">
          <Link to="/" onClick={closeMenu}>
            <img src={Logo} alt="Portfolio Logo" className="site-logo" />
          </Link>
        </div>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={toggleMenu}>
          Menu
        </button>
        <nav className={`site-navigation ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><NavLink to='/' end onClick={closeMenu}>Home</NavLink></li>
            <li><NavLink to='/about' onClick={closeMenu}>About</NavLink></li>
            <li><NavLink to='/projects' onClick={closeMenu}>Projects</NavLink></li>
            {/* <li><NavLink to='/skills' onClick={closeMenu}>Skills</NavLink></li> */}
            <li><NavLink to='/contact' onClick={closeMenu}>Contact</NavLink></li>
          </ul>
        </nav>
      </header>
      <main id="main">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/project/:id' element={<Project />} />
          {/* <Route path='/skills' element={<Skills />} /> */}
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
