import { useState } from 'react'
import { Link } from 'react-router-dom'

export function Person() {
  const [person, setPerson] = useState({})
  return (
    <>
      <h1 className="Person page title">Person</h1>
      <div className="basic info">
        <ul className="important facts">
          <li>Tagline</li>
          <li>Born: birthday</li>
          <li>Died: deathday</li>
          <li>Country: country</li>
        </ul>
        <div>Profile Picture Here</div>
      </div>
      <div className="quick little bio">
        <p>
          Here is a biography about the person in question. They were born in a
          place and probably had parents. Some more stuff happened. Maybe they
          traveled. Maybe they fell in love. Maybe they killed a man. Who's to
          say? Well, I guess I am. Anyway, hopefully this is enough for me to
          figure out how this page should look. At least for some basic css
          stuff. OkieDokie.{' '}
        </p>
      </div>
      <h3>Recommendations</h3>
      <div className="recommended media">
        <ul className="nonfiction sources">
          <h5>Nonfiction</h5>
          <li>Some Book</li>
          <li>Documentary or podcast maybe</li>
        </ul>
        <ul className="fiction sources">
          <h5>Fiction</h5>
          <li>Movie</li>
          <li>Video Game</li>
        </ul>
      </div>
      <button className="go home">
        <Link to="/">Home</Link>
      </button>
      <button>Edit</button>
    </>
  )
}
