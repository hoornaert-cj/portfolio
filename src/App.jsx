import { Route, Routes, Link, NavLink } from 'react-router-dom'
import Home from './templates/Home'
import About from './templates/About'
import Posts from './templates/Posts'
import Post from './templates/Post'
import Services from './templates/Services'


function App() {

  return (
    <>
      <header id="masthead" className="site-header">
        <div className="site-branding">
          {/* <p className="site-title">Headless WordPress App</p> */}
        </div>
        <nav className="site-navigation">
          <ul>
            <li><NavLink to='/' end>Home</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/blog'>Blog</NavLink></li>
            <li><NavLink to='/'>Services</NavLink></li>
          </ul>
        </nav>
      </header>
      <main id="main">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/blog' element={<Posts />} />
          <Route path='/blog/:slug' element={<Post />} />
          <Route path='/services' element={<Services />} />
        </Routes>
      </main>
      <footer>
        <nav className="site-navigation">
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
          </ul>
        </nav>
        <p className="copyright">Created by <a href="https://chrishoornaert.com/" target="_blank" rel="noopener noreferrer">Chris Hoornaert</a>.</p>
      </footer>
    </>
  )
}

export default App
