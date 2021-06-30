import { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { authHeader, isLoggedIn, getUser } from '../auth'

export function EditPerson() {
  const history = useHistory()
  const user = getUser()
  const params = useParams()
  const id = params.id
  const [errorMessage, setErrorMessage] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const [person, setPerson] = useState({
    name: '',
    birthYear: 0,
    birthday: '',
    deathdate: '',
    country: '',
    biography: '',
    photoURL: '',
    // userId: 0,
    maker: '',
    lastUpdater: '',
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
    console.log(person)
  }, [id])

  const by = String(person.birthYear)
  const bm = person.birthday.split('-')[1]
  const bd = person.birthday.split('-')[0]
  const [bYear, setBYear] = useState('')
  const [bMonth, setBMonth] = useState('')
  const [bDate, setBDate] = useState('')

  const dy = person.deathdate.split('-')[0]
  const dm = person.deathdate.split('-')[1]
  const dd = person.deathdate.split('-')[2]
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

    //if birth/death dates aren't changed
    if (bDate === '') {
      setBDate(bd)
    }
    if (bMonth === '') {
      setBMonth(bm)
    }
    if (bYear === '') {
      setBYear(by)
    }
    if (dDate === '') {
      setDDate(dd)
    }
    if (dMonth === '') {
      setDMonth(dm)
    }
    if (dYear === '') {
      setDYear(dy)
    }

    // handle bce
    if (bbce.checked) {
      person.birthYear = 0 - parseInt(bYear)
    } else {
      person.birthYear = parseInt(bYear)
    }
    person.birthday = `${bMonth}-${bDate}`
    if (dbce.checked) {
      person.deathdate = `${dYear}-${dMonth}-${dDate} BCE`
    } else {
      person.deathdate = `${dYear}-${dMonth}-${dDate}`
    }

    person.lastUpdater = user.fullName

    const response = await fetch(`/api/LgbtPeople/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      // , ...authHeader
      body: JSON.stringify(person),
    })
    if (response.ok) {
      history.push(`/person/${id}`)
    } else {
      console.log('oops')
    }

    console.log('form submitted')
  }

  // might use this later
  // if (response.status === 401) {
  //   setErrorMessage('Not Authorized')
  // } else {
  //   if (response.status === 400) {
  //     const json = await response.json()
  //     setErrorMessage(Object.values(json.errors).join(' '))
  //   } else {
  //     history.push('/')
  //   }
  // }

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    setPerson({ ...person, [fieldName]: value })

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

        setPerson({ ...person, photoURL: url })
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

  // only show submit button if logged in
  const submitButton = isLoggedIn() ? (
    dDate === '' ? (
      <input type="submit" value="Looks Good" onClick={handleFormSubmit} />
    ) : (
      <input type="submit" value="Submit" onClick={handleFormSubmit} />
    )
  ) : null

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
      <h1 className="edit person page title">Edit {person.name}</h1>
      {errorMessage}

      <form onSubmit={handleFormSubmit}>
        <p>
          <label className="input for name">Name: </label>
          <input
            type="text"
            name="name"
            value={person.name}
            onChange={handleStringFieldChange}
          />
        </p>
        <div className="information form">
          <p className="input for birth date">
            <label>Birthdate: </label>
            <input
              type="number"
              placeholder={person.birthYear}
              name="birthyear"
              value={bYear}
              onChange={(event) => setBYear(event.target.value)}
            />
            <input
              type="number"
              placeholder={bm}
              name="birthmonth"
              value={bMonth}
              onChange={(event) => setBMonth(event.target.value)}
            />
            <input
              type="number"
              placeholder={bd}
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
              placeholder={dy}
              name="deathyear"
              value={dYear}
              onChange={(event) => setDYear(event.target.value)}
            />
            <input
              type="number"
              placeholder={dm}
              name="deathmonth"
              value={dMonth}
              onChange={(event) => setDMonth(event.target.value)}
            />
            <input
              type="number"
              placeholder={dd}
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
              value={person.country}
              onChange={handleStringFieldChange}
            />
          </p>

          {person.photoURL ? (
            <p>
              <img alt="Person" width={200} src={person.photoURL} />
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
            value={person.biography}
            onChange={handleStringFieldChange}
          ></textarea>
        </p>

        <p className="submit-person">{submitButton}</p>
      </form>
      <div className="home">
        <button className="go home">
          <Link to="/">Home</Link>
        </button>
      </div>
    </>
  )
}
