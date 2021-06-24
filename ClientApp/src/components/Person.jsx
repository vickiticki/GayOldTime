import { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'

export function Person() {
  const params = useParams()
  const id = params.id
  const history = useHistory()

  const [person, setPerson] = useState({
    name: '',
    birthYear: 0,
    birthday: '',
    deathdate: '',
    country: '',
    biography: '',
    mediaRecs: [],
  })

  const [newFMedia, setNewFMedia] = useState({
    item: '',
    fiction: true,
    personId: id,
    LgbtPersonId: id,
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

  async function handleNewFMediaSubmit(event) {
    event.preventDefault()
    const response = await fetch(`/api/MediaRec`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newFMedia),
    })
  }

  function displayBirth(person) {
    if (person.birthYear < 0) {
      const newYear = 0 - person.birthYear
      return `${newYear}-${person.birthday} BCE`
    } else {
      return `${person.birthYear.toString()}-${person.birthday}`
    }
  }

  function handleFictionChange(event) {
    setNewFMedia({
      item: event.target.value,
      fiction: true,
      personId: id,
      LgbtPersonId: id,
    })
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
            .filter((x) => x.fiction === false)
            .map((media) => (
              <li key={media.id}>{media.item}</li>
            ))}
        </ul>
        <ul className="fiction sources">
          <h5>Fiction</h5>
          {person.mediaRecs
            .filter((x) => x.fiction === true)
            .map((media) => (
              <li key={media.id}>{media.item}</li>
            ))}
          <li>
            <input type="text" name="fiction" onChange={handleFictionChange} />
            <button onClick={handleNewFMediaSubmit}>Add</button>
          </li>
        </ul>
      </div>
      <button className="go home">
        <Link to="/">Home</Link>
      </button>
      <button>Edit</button>
    </>
  )
}
