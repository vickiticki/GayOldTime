import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export function NewPerson() {
  const history = useHistory()

  const [newPerson, setNewPerson] = useState({
    name: '',
    birthdate: '',
    deathdate: '',
    country: '',
    biography: '',
  })

  const [bYear, setBYear] = useState('')
  const [bMonth, setBMonth] = useState('')
  const [bDate, setBDate] = useState('')

  const [dYear, setDYear] = useState('')
  const [dMonth, setDMonth] = useState('')
  const [dDate, setDDate] = useState('')

  const bbce = document.querySelector('#bbce')
  const dbce = document.querySelector('#dbce')

  async function handleFormSubmit(event) {
    event.preventDefault()
    if (bYear < 1000) {
      setBYear(`0${bYear}`)
    }
    if (bbce.checked) {
      newPerson.birthdate = `${bYear}-${bMonth}-${bDate} BCE`
    } else {
      newPerson.birthdate = `${bYear}-${bMonth}-${bDate}`
    }
    if (dbce.checked) {
      newPerson.deathdate = `${dYear}-${dMonth}-${dDate} BCE`
    } else {
      newPerson.deathdate = `${dYear}-${dMonth}-${dDate}`
    }

    const response = await fetch('/api/LgbtPeople', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newPerson),
    })
    if (response.ok) {
      history.push('/')
    } else {
      console.log('oops')
    }

    console.log('form submitted')
  }

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    setNewPerson({ ...newPerson, [fieldName]: value })

    console.log(newPerson.name)
  }

  function birthBCE() {
    if (bbce.checked) {
      console.log('yessir')
    } else {
      console.log('nope')
    }
  }

 

  return (
    <>
      <h1 className="new person page title">New Person</h1>
      <form onSubmit={handleFormSubmit}>
        <p>
          <label className="input for name">Name</label>
          <input
            type="text"
            name="name"
            value={newPerson.name}
            onChange={handleStringFieldChange}
          />
        </p>
        <div className="information form">
          
          <p className="input for birth date">
            <label>Birthdate</label>
            <input
              type="number"
              placeholder="YYYY"
              name="birthyear"
              value={bYear}
              onChange={(event) => setBYear(event.target.value)}
            />
            <input
              type="number"
              placeholder="MM"
              name="birthmonth"
              value={bMonth}
              onChange={(event) => setBMonth(event.target.value)}
            />
            <input
              type="number"
              placeholder="MM"
              name="birthday"
              value={bDate}
              onChange={(event) => setBDate(event.target.value)}
            />
            {'   '}
            BCE
            <input
              type="checkbox"
              id="bbce"
              name="birthBCE"
              onChange={birthBCE}
            />
          </p>
          <p className="input for death date">
            <label>Deathdate</label>
            <input
              type="number"
              placeholder="YYYY"
              name="deathyear"
              value={dYear}
              onChange={(event) => setDYear(event.target.value)}
            />
            <input
              type="number"
              placeholder="MM"
              name="deathmonth"
              value={dMonth}
              onChange={(event) => setDMonth(event.target.value)}
            />
            <input
              type="number"
              placeholder="DD"
              name="deathday"
              value={dDate}
              onChange={(event) => setDDate(event.target.value)}
            />
            {'   '}
            BCE
            <input type="checkbox" id="dbce" name="deathBCE" value="BCE" />
          </p>
          <p className="input for country of origin">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={newPerson.country}
              onChange={handleStringFieldChange}
            />
          </p>
          {/* this part will probably move to the bottom */}
          <div>Profile Picture Here</div>
        </div>

        <p className="input for biography">
          <label>Biography</label>
          <textarea
            name="biography"
            value={newPerson.biography}
            onChange={handleStringFieldChange}
          ></textarea>
        </p>

        <h3>Recommended Media</h3>
        <div className="recommended media">
          <ul className="nonfiction sources">
            {/* change this to one input box and one checkmark for nonfiction */}
            <h5>Nonfiction</h5>
            <li>
              <input type="text" name="nonfiction" />
            </li>
          </ul>
          <ul className="fiction sources">
            <h5>Fiction</h5>
            <li>
              <input type="text" name="fiction" />
            </li>
          </ul>
        </div>
        <p>
          <input type="submit" value="Submit" onClick={handleFormSubmit} />
        </p>
      </form>
      <button className="go home">
        <Link to="/">Home</Link>
      </button>
    </>
  )
}
