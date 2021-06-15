import { useState } from 'react'
import { Link } from 'react-router-dom'

export function NewPerson() {
  const [person, setPerson] = useState({})
  return (
    <>
      <h1 className="new person page title">New Person</h1>
      <form>
        <p>
          <label className="input for name">Name</label>
          <input type="text" name="name" />
        </p>
        <div className="information form">
          <p className="input for tagline">
            <label>Tagline</label>
            <input type="text" name="tagline" />
          </p>
          <p className="input for birth date">
            <label>Birthdate</label>
            <input type="text" placeholder="YYYY" name="birthyear" />
            <input type="text" placeholder="MM" name="birthmonth" />
            <input type="text" placeholder="MM" name="birthday" />
          </p>
          <p className="input for death date">
            <label>Deathdate</label>
            <input type="text" placeholder="YYYY" name="deathyear" />
            <input type="text" placeholder="MM" name="deathmonth" />
            <input type="text" placeholder="DD" name="deathday" />
          </p>
          <p className="input for country of origin">
            <label>Country</label>
            <input type="text" name="country" />
          </p>
          {/* this part will probably move to the bottom */}
          <div>Profile Picture Here</div>
        </div>

        <p className="input for biography">
          <label>Biography</label>
          <textarea name="biography"></textarea>
        </p>

        <h3>Recommendations</h3>
        <div className="recommended media">
          <ul className="nonfiction sources">
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
          <input type="submit" value="Submit" />
        </p>
      </form>
      <button className="go home">
        <Link to="/">Home</Link>
      </button>
    </>
  )
}
