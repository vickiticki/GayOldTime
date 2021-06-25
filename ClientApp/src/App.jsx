import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import { Foot } from './components/Foot'
import { People } from './pages/People'
import { Person } from './pages/Person'
import { NewPerson } from './pages/NewPerson'
import './custom.scss'

export function App() {
  return (
    <>
      <Header />
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
      <Foot />
    </>
  )
}
