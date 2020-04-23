import React, { useEffect } from 'react'
import './App.css'
import Dashboard from './Dashboard'
import Login, { LoginState } from './Login'
import { connect } from 'react-redux'
import { checkUser } from './reducers/loginSlice'

function App({ user, checkUser }) {
  useEffect(() => {
    const logedInUser = JSON.parse(localStorage.getItem('user')!)
    logedInUser && checkUser(logedInUser)
  }, [])
  return (
    <>
      {user ? <Dashboard user={user} /> : <Login />}
    </>
  )
}

const mapState = (state: LoginState) => ({ user: state.login.user })

export default connect(mapState, { checkUser })(App)