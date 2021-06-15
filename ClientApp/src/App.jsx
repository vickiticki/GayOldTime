import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { People } from './components/People'
import { Person } from './components/Person'
import './custom.scss'

export function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <People />
        </Route>
        <Route exact path="/person">
          <Person />
        </Route>
      </Switch>
    </>
  )
}
