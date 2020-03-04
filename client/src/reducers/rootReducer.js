import { combineReducers } from 'redux';
import userReducer from './userReducer';
import searchReducer from './searchReducer';
import songReducer from './songReducer'

const rootReducer = combineReducers({
  userReducer, searchReducer, songReducer
})

export default rootReducer;