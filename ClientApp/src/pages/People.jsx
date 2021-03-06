import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../auth'

export function People() {
  const [people, setPeople] = useState([])
  const [filterText, setFilterText] = useState('')
  const [howSort, setHowSort] = useState('date')

  useEffect(
    function () {
      async function loadPeople() {
        const url =
          filterText.length === 0
            ? `api/LgbtPeople`
            : `/api/LgbtPeople?filter=${filterText}`

        const response = await fetch(url)
        console.log('check')

        if (response.ok) {
          console.log('check 2')
          const json = await response.json()

          console.log(json)
          setPeople(json)
        }
      }
      loadPeople()
    },
    [filterText]
  )

  function displayBirthYear(person) {
    if (person.birthYear < 0) {
      return `${0 - person.birthYear} BCE`
    } else {
      return person.birthYear
    }
  }

  // this will need to be adjusted to accommodate BCE
  function dateSort(people) {
    people.sort(function (a, b) {
      if (a.birthYear < b.birthYear) {
        return -1
      }
      if (a.birthYear > b.birthYear) {
        return 1
      }
      return 0
    })
  }

  function nameSort(names) {
    console.log('sort by name')
    names.sort(function (a, b) {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
  }

  function Sorting(people) {
    if (howSort === 'date') {
      dateSort(people)
    } else {
      nameSort(people)
    }
  }
  return (
    <>
      <div className="all">
        <div className="roy">
          <div className="red stripe"></div>
          <div className="orange stripe"></div>
          <div className="yellow stripe"></div>
        </div>
        <div className="front page">
          <h1 className="main page title">Gay Old Time</h1>
          <p className="subtitle">LGBT+ Historical Figures</p>
          <div className="search and filter stuff">
            <p className="search label">Search</p>
            <input
              type="text"
              id="nameSearch"
              placeholder="Name or Country"
              className="searchBox"
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
            />
          </div>
          <div className="pick the order">
            Order By:
            <button onClick={(event) => setHowSort('date')}>Date</button>
            <button onClick={(event) => setHowSort('name')}>Name</button>
          </div>
          <main>
            <ul>
              {Sorting(people)}
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
          </main>
          <div className="make">
            {isLoggedIn() ? (
              <button className="create person button">
                <Link to="/newperson">Add a Person</Link>
              </button>
            ) : (
              <p className="nsi">Sign In to Add a Person</p>
            )}
          </div>
        </div>
        <div className="gbp">
          <div className="green stripe"></div>
          <div className="blue stripe"></div>
          <div className="purple stripe"></div>
        </div>
      </div>
    </>
  )
}
