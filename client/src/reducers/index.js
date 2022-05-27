import { combineReducers } from 'redux'
import changeState from './changeState'
import alert from './alert'
import auth from './auth'

export default combineReducers({
  changeState,
  alert,
  auth,
})
