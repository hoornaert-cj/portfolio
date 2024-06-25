import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './sass/styles.scss'
<sass></sass>
import { BrowserRouter } from 'react-router-dom'

import { APP_FOLDER_NAME } from './js/globalVariables.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={`/${APP_FOLDER_NAME}`}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
