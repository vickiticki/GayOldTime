import { Link } from 'react-router-dom'
import { getUser, isLoggedIn, logout } from '../auth'

export function Header() {
  const user = getUser()

  function handleLogout() {
    logout()

    window.location.assign('/')
  }

  const signInButton = isLoggedIn() ? (
    <span className="signout" onClick={handleLogout}>
      Sign out
    </span>
  ) : (
    <Link to="/SignIn">Sign In</Link>
  )
  const signUpButton = isLoggedIn() ? null : <Link to="/SignUp/">Sign Up</Link>
  const helloUser = isLoggedIn() ? <p>Hello, {user.fullName}!</p> : null

  return (
    <>
      <header>
        <div className="top left">
          <h5>
            <Link to="/">Gay Old Time</Link>
          </h5>
        </div>
        <div className="top middle">{helloUser}</div>
        <div className="top right">
          <ul>
            <li>{signInButton}</li>
            <li className="signup link">{signUpButton}</li>
          </ul>
        </div>
      </header>
    </>
  )
}
