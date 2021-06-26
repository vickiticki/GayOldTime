import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export function SignUp() {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState()

  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/Users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })
    const apiResponse = await response.json()

    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      history.push('/')
    }
  }

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name
    const updatedUser = { ...newUser, [fieldName]: value }
    setNewUser(updatedUser)
  }

  return (
    <>
      <h1>Sign Up</h1>
      {errorMessage ? <p>{errorMessage}</p> : null}
      <p>
        <label className="new user username">Name:</label>{' '}
        <input
          type="text"
          name="fullName"
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
      <button className="make user" onClick={handleFormSubmit}>
        Make Account
      </button>

      <button className="go home">
        <Link to="/">Home</Link>
      </button>
    </>
  )
}
