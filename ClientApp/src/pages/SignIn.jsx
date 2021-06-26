import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export function SignIn() {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState()

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name
    const updatedUser = { ...user, [fieldName]: value }
    setUser(updatedUser)
  }

  return (
    <>
      <h1>Sign In</h1>
      {errorMessage ? <p>{errorMessage}</p> : null}

      <p>
        <label className="returning user email">Email: </label>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={user.email}
          onChange={handleStringFieldChange}
        />
      </p>
      <p>
        <label className="returning user password">Password: </label>
        <input
          type="text"
          name="password"
          placeholder="password"
          value={user.password}
          onChange={handleStringFieldChange}
        />
      </p>
      <button className="signin">Sign In</button>

      <button className="go home">
        <Link to="/">Home</Link>
      </button>
    </>
  )
}
