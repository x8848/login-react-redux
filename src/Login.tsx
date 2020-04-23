import React from 'react'
import { connect } from 'react-redux'
import { tryLogin } from './reducers/loginSlice'

const Login = ({ error, tryLogin }) => {
    function submit(e) {
        e.preventDefault()
        const body = {
            name: e.currentTarget.username.value,
            password: e.currentTarget.password.value
        }
        tryLogin(body)
    }
    return (
        <div className='login'>
            <p>Sign In</p>
            <hr />
            <form onSubmit={submit}>
                <label>
                    <span>Email</span>
                    <input type="text" name="username" required />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" name="password" required />
                </label>
                <button type='submit'>Sign In</button>
            </form>
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export interface User {
    name: string;
    token: string;
}

export interface LoginState {
    login: {
        user: User;
        error: string;
    }
}

export interface LoginParams {
    name: string;
    password: string;
}

const mapState = (state: LoginState) => ({ error: state.login.error })

export default connect(mapState, { tryLogin })(Login)