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

  function displayBirthYear(person) {
    if (person.birthdate.includes('B')) {
      return person.birthdate.slice(0, 4) + ' BCE'
    } else {
      return person.birthdate.slice(0, 4)
    }
  }

  return (
    <>
      <h1 className="home page title">Gay Old Time</h1>
      <div className="home search and filter stuff">
        <p className="search label">Search</p>
        <input
          type="text"
          id="nameSearch"
          placeholder="Name or Country"
          value={searchName}
          onChange={(event) => setSearchName(event.target.value)}
        />
        {/* <p>Filter: </p>
       
        <button>Era</button>
        <button>Country</button> */}
      </div>
      <div className="pick the order">
        Order By:
        <button>Date</button>
        <button>Name</button>
      </div>

      <ul>
        {people.map((person) => (
          <li key={person.id}>
            <h4>
              <Link to={`/person/${person.id}`}>{person.name} </Link>
            </h4>

            <p>{displayBirthYear(person)}</p>
            <p>{person.country}</p>
          </li>
        ))}
      </ul>

      <button className="add person button">
        <Link to="/newperson">Add a Person</Link>
      </button>
    </>
  )
}
