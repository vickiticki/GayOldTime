import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { People } from './components/People'
import { Person } from './components/Person'
import { NewPerson } from './components/NewPerson'
import './custom.scss'

export function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <People />
        </Route>
        <Route exact path="/person/:id">
          <Person />
        </Route>
        <Route exact path="/newperson/">
          <NewPerson />
        </Route>
      </Switch>
    </>
  )
}
