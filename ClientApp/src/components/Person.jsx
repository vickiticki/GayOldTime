import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function Person() {
  const params = useParams()
  const id = params.id

  const [person, setPerson] = useState({
    name: '',
    birthYear: 0,
    birthday: '',
    deathdate: '',
    country: '',
    biography: '',
    mediaRecs: [],
  })

  useEffect(() => {
    async function fetchPerson() {
      const response = await fetch(`/api/LgbtPeople/${id}`)

      if (response.ok) {
        const apiData = await response.json()

        setPerson(apiData)
      }
    }
    fetchPerson()
  }, [id])

  function displayBirth(person) {
    if (person.birthYear < 0) {
      const newYear = 0 - person.birthYear
      return `${newYear}-${person.birthday} BCE`
    } else {
      return `${person.birthYear.toString()}-${person.birthday}`
    }
  }

  return (
    <>
      <h1 className="Person page title">{person.name}</h1>
      <div className="basic info">
        <ul className="important facts">
          <li>
            Born: {displayBirth(person)}
            {/* Born: {person.birthYear.toString()}-{person.birthday} */}
          </li>
          <li>Died: {person.deathdate}</li>
          <li>Country: {person.country}</li>
        </ul>
        <div>Profile Picture Here</div>
      </div>
      <div className="quick little bio">
        <p>{person.biography}</p>
      </div>
      <h3>Recommended Media</h3>
      <div className="recommended media">
        <ul className="nonfiction sources">
          <h5>Nonfiction</h5>
          {person.mediaRecs
            .filter((x) => x.fiction == false)
            .map((media) => (
              <li key={media.id}>{media.item}</li>
            ))}
        </ul>
        <ul className="fiction sources">
          <h5>Fiction</h5>
          {person.mediaRecs
            .filter((x) => x.fiction == true)
            .map((media) => (
              <li key={media.id}>{media.item}</li>
            ))}
        </ul>
      </div>
      <button className="go home">
        <Link to="/">Home</Link>
      </button>
      <button>Edit</button>
    </>
  )
}
