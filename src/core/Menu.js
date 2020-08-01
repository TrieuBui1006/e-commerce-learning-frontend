import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout } from '../auth'

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' }
  } else {
    return { color: '#ffffff' }
  }
}

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" to="/" style={isActive(history, '/')}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/signin"
            style={isActive(history, '/signin')}
          >
            Sign in
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/signup"
            style={isActive(history, '/signup')}
          >
            Sign up
          </Link>
        </li>
        <li className="nav-item">
          <span
            className="nav-link"
            onClick={() =>
              signout(() => {
                history.push('/')
              })
            }
            style={{ cursor: 'pointer', color: '#fff' }}
          >
            Sign out
          </span>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Menu)
