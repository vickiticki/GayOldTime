import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import { Foot } from './components/Foot'
import { People } from './pages/People'
import { Person } from './pages/Person'
import { NewPerson } from './pages/NewPerson'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { EditPerson } from './pages/EditPerson'
import './custom.scss'
//
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
        <Route exact path="/signup/">
          <SignUp />
        </Route>
        <Route exact path="/signin/">
          <SignIn />
        </Route>
        <Route exact path="/editperson/:id">
          <EditPerson />
        </Route>
      </Switch>
      <Foot />
    </>
  )
}
