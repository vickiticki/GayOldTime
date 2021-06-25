import { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'

export function SignIn() {
  const history = useHistory()
  const [erroMessage, setErroMessage] = useState()

  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name
    const updatedUser = { ...newUser, [fieldName]: value }
    setNewUser(updatedUser)
  }

  return (
    <>
      <h1>Sign In</h1>
      {erroMessage ? <p>{erroMessage}</p> : null}

      <p>
        <label className="returning user email">Email:</label>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={newUser.email}
          onChange={handleStringFieldChange}
        />
      </p>
      <p>
        <label className="returning user password">Password: </label>
        <input
          type="text"
          name="password"
          placeholder="password"
          value={newUser.password}
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
