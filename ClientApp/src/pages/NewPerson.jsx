import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { authHeader } from '../auth'

export function NewPerson() {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const [newPerson, setNewPerson] = useState({
    name: '',
    birthYear: 0,
    birthday: '',
    deathdate: '',
    country: '',
    biography: '',
    photoURL: '',
  })

  const [bYear, setBYear] = useState('')
  const [bMonth, setBMonth] = useState('')
  const [bDate, setBDate] = useState('')

  const [dYear, setDYear] = useState('')
  const [dMonth, setDMonth] = useState('')
  const [dDate, setDDate] = useState('')

  const bbce = document.querySelector('#bbce')
  const dbce = document.querySelector('#dbce')

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  })

  async function handleFormSubmit(event) {
    event.preventDefault()

    if (bbce.checked) {
      newPerson.birthYear = 0 - parseInt(bYear)
      newPerson.birthday = `${bMonth}-${bDate}`
    } else {
      newPerson.birthYear = parseInt(bYear)
      newPerson.birthday = `${bMonth}-${bDate}`
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

    // console.log(newPerson.name)
  }

  async function onDropFile(acceptedFiles) {
    // Do something with the files
    const fileToUpload = acceptedFiles[0]
    console.log(fileToUpload)

    // Create a formData object so we can send this
    // to the API that is expecting som form data.
    const formData = new FormData()

    // Append a field that is the form upload itself
    formData.append('file', fileToUpload)

    setIsUploading(true)

    try {
      // Use fetch to send an authorization header and
      // a body containing the form data with the file
      const response = await fetch('/api/Uploads', {
        method: 'POST',
        headers: {
          ...authHeader(),
        },
        body: formData,
      })

      // If we receive a 200 OK response, set the
      // URL of the photo in our state so that it is
      // sent along when creating the restaurant,
      // otherwise show an error
      if (response.status === 200) {
        const apiResponse = await response.json()

        const url = apiResponse.url

        setNewPerson({ ...newPerson, photoURL: url })
      } else {
        setErrorMessage('Unable to upload image oops')
      }
    } catch {
      // Catch any network errors and show the user we could not process their upload

      setErrorMessage('Unable to upload image')
    }
    setIsUploading(false)
  }

  let dropZoneMessage = 'Drag a picture of the person here to upload!'

  if (isUploading) {
    dropZoneMessage = 'Uploading...'
  }

  if (isDragActive) {
    dropZoneMessage = 'Drop the files here ...'
  }

  // do I still use this?
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
      {errorMessage}
      <form onSubmit={handleFormSubmit}>
        <p>
          <label className="input for name">Name: </label>
          <input
            type="text"
            name="name"
            value={newPerson.name}
            onChange={handleStringFieldChange}
          />
        </p>
        <div className="information form">
          <p className="input for birth date">
            <label>Birthdate: </label>
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
              placeholder="DD"
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
            <label>Deathdate: </label>
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
            <label>Country: </label>
            <input
              type="text"
              name="country"
              value={newPerson.country}
              onChange={handleStringFieldChange}
            />
          </p>
          {/* <p className="form-input">
            <label htmlFor="picture">Picture</label>
            <input type="file" name="picture" />
          </p> */}
          {newPerson.photoURL ? (
            <p>
              <img alt="Person" width={200} src={newPerson.photoURL} />
            </p>
          ) : null}

          <div className="file-drop-zone">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {/* {isDragActive
                ? 'Drop the files here ...'
                : 'Drag a picture of the person here to upload!'} */}
              {dropZoneMessage}
            </div>
          </div>
        </div>

        <p className="input for biography">
          <label>Biography: </label>
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
