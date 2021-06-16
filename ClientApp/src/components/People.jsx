import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function People() {
  const [people, setPeople] = useState([])
  const [searchName, setSearchName] = useState('')

  useEffect(function () {
    async function loadPeople() {
      const response = await fetch('/api/LgbtPeople')
      console.log('check')

      if (response.ok) {
        console.log('check 2')
        const json = await response.json()

        console.log(json)
        setPeople(json)
      }
    }
    loadPeople()
  }, [])

  return (
    <>
      <h1 className="home page title">Gay Old Time</h1>
      <div className="home search and filter stuff">
        <p>Search</p>
        <input
          type="text"
          id="nameSearch"
          placeholder="search"
          value={searchName}
          onChange={(event) => setSearchName(event.target.value)}
        />
        <p>Filter: </p>
        {/* make these drop down buttons */}
        {/* actually might get rid of this and just make it part of search */}
        <button>Era</button>
        <button>Country</button>
      </div>
      <div className="pick the order">
        Order By:
        <button>Date</button>
        <button>Name</button>
      </div>

      {/* <ul className="list of the people">
        <li>
          <Link to="/person">Sappho 630BCE</Link>
        </li>
        <li>Leonard da Vinci 1452</li>
        <li>Julie d'Aubigny 1670</li>
        <li>just</li>
        <li>some</li>
        <li>more</li>
        <li>lines</li>
      </ul> */}

      <ul>
        {people.map((person) => (
          <li key={person.id}>
            <Link to={`/person/${person.id}`}>{person.name}</Link>
          </li>
        ))}
      </ul>

      <button>
        <Link to="/newperson">Add a Person</Link>
      </button>
    </>
  )
}
