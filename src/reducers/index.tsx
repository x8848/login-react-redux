import { combineReducers } from 'redux'
import loginReducer from './loginSlice'
import contentReducer from './contentSlice'

export default combineReducers({
  login: loginReducer,
  content: contentReducer
})