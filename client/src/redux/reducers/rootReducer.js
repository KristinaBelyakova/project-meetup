import { combineReducers } from 'redux'
import userReducer from './userReducer'
import profileReducer from './profileReducer'
import mapReducer from './mapReducer';
import tagsReducer from './tagsReducer'
import travelReducer from "./travelReducer"

const rootReducer = combineReducers({
  user: userReducer,
  tags: tagsReducer,
  // profile: profileReducer,
  map: mapReducer,
  travels: travelReducer
})

export default rootReducer
