import { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'

export function SignUp() {
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
      <h1>Sign Up</h1>
      <p>
        <label className="new user username">User Name:</label>{' '}
        <input
          type="text"
          name="username"
          placeholder="name"
          value={newUser.fullName}
          onChange={handleStringFieldChange}
        />
      </p>
      <p>
        <label className="new user email">Email:</label>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={newUser.email}
          onChange={handleStringFieldChange}
        />
      </p>
      <p>
        <label className="new user password">Password: </label>
        <input
          type="text"
          name="password"
          placeholder="password"
          value={newUser.password}
          onChange={handleStringFieldChange}
        />
      </p>
      <button className="make user">Make Account</button>

      {erroMessage ? <p>{erroMessage}</p> : null}

      <button className="go home">
        <Link to="/">Home</Link>
      </button>

      {/* <label className="input for name">Name: </label>
          <input
            type="text"
            name="name"
            value={newPerson.name}
            onChange={handleStringFieldChange}
          /> */}
    </>
  )
}
