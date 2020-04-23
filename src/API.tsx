import axios from 'axios'
import { LoginParams } from './Login'

const LOGIN_URL = '/login'
const AUTH_URL = '/auth'

export async function userLogin(body: LoginParams) {
    return await axios.post(LOGIN_URL, body)
}

export async function checkToken(token: string) {
    return await axios.post(AUTH_URL, { token: token })
}

export async function getContent(url: string) {
    return await axios.get(url)
}