// react-redux
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'

// css
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('popstate', (event) => {
    window.securedNav = true
  })

  const root = document.getElementById('root')

  ReactDOM.render(<Root />, root)
})
