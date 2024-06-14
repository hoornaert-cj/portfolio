import { Route, Routes, NavLink } from 'react-router-dom';
import Home from './templates/Home';
import About from './templates/About';
import Projects from './templates/Projects';
import Project from './templates/Project';
import Skills from './templates/Skills';
import Contact from './templates/Contact';
import './sass/abstracts/_mixins.scss';  // Corrected import statement

function App() {
  return (
    <>
      {/* Include the gradient background */}
      <div className="gradient-background"></div>
      <header id="masthead" className="site-header">
        <div className="site-branding">
        </div>
        <nav className="site-navigation">
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
        <nav className="site-navigation">
          <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
          </ul>
        </nav>
        <p className="copyright">
          Created by <a href="https://chrishoornaert.com/" target="_blank" rel="noopener noreferrer">Chris Hoornaert</a>.
        </p>
      </footer>
    </>
  );
}

export default App;
