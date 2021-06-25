import { Link } from 'react-router-dom'
export function Header() {
  return (
    <>
      <header>
        <div className="top left">
          <h5>
            <Link to="/">Gay Old Time</Link>
          </h5>
        </div>
        <div className="top right">
          <ul>
            <li>Sign In</li>
            <li>
              <Link to="/SignUp/">Sign Up</Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}
