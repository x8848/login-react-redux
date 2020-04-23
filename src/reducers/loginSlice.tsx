import { createSlice } from '@reduxjs/toolkit'
import * as API from '../API'
import { User, LoginParams } from '../Login'

const USER = 'user'

const initialState = {
    user: null,
    error: null
}

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        loginSuccess: (state, action) => ({ user: action.payload, error: null }),
        loginFailed: (state, action) => ({ user: null, error: action.payload }),
        logout: (state, action) => { localStorage.removeItem(USER); return initialState }
    }
})

export const tryLogin = (body: LoginParams) => async dispatch => {
    try {
        const response = await API.userLogin(body)
        if (response.status === 200) {
            const user = response.data
            dispatch(loginSuccess(user))
            localStorage.setItem(USER, JSON.stringify(user))
        } else throw new Error(`${response.status} ${response.statusText}`)
    } catch (e) {
        dispatch(loginFailed(e.toString()))
    }
}

export const checkUser = (user: User) => async dispatch => {
    try {
        const response = await API.checkToken(user.token)
        if (response.status === 200) {
            dispatch(loginSuccess(user))
        } else throw new Error()
    } catch (e) {
        dispatch(logout)
    }
}

export const { loginSuccess, loginFailed, logout } = loginSlice.actions

export default loginSlice.reducer