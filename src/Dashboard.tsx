import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'
import Content from './Content'
import { logout } from './reducers/loginSlice'
import { connect } from 'react-redux'

const ERROR_URL = 'https://api'
const EMOJI_URL = 'https://api.github.com/emojis'

const Dashboard = ({ logout, user }) => {
    return (
        <BrowserRouter>
            <div className="nav">
                <label>Dashboard</label>
                <label className="user">{user.name}</label>
                <label onClick={() => logout()} className='logout'>Logout</label>
            </div>
            <div className="row">
                <div className="menu">
                    <NavLink exact to="/">Dashboard</NavLink>
                    <NavLink to="/settings">Settings</NavLink>
                </div>
                <Switch>
                    <Route exact path="/"><Content url={EMOJI_URL}>Dashboard</Content></Route>
                    <Route path="/settings"><Content url={ERROR_URL}>Settings</Content></Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default connect(null, { logout })(Dashboard)