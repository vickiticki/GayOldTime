import { useState } from 'react'
import { Link } from 'react-router-dom'
import { recordAuthentication } from '../auth'

export function SignIn() {
  // const history = useHistory()
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

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/Sessions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user),
    })

    const apiResponse = await response.json()

    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      recordAuthentication(apiResponse)
      window.location.assign('/')
    }
  }

  return (
    <>
      <h1>Sign In</h1>

      {errorMessage ? <p>{errorMessage}</p> : null}

      <form onSubmit={handleFormSubmit}>
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
            type="password"
            name="password"
            placeholder="password"
            value={user.password}
            onChange={handleStringFieldChange}
          />
        </p>
      </form>
      <button className="signin" onClick={handleFormSubmit}>
        Sign In
      </button>

      <button className="go home">
        <Link to="/">Home</Link>
      </button>
    </>
  )
}
