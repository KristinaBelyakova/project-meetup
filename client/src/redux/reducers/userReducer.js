import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  INIT_USER,
  CHANGE_VISIBILITY_USER,
  UPDATE_USER,
  ADD_FRIEND,
  REMOVE_FRIEND,
} from '../actionTypes/actionTypes'

const initialState = { user: {}, isAuth: false, visibility: false }

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      // console.log(action.payload);
      return { ...state, user: action.payload, isAuth: true }

    case LOGIN:
      // console.log(action.payload);
      return { ...state, user: action.payload, isAuth: true }

    case LOGOUT:
      window.localStorage.clear()
      return { ...state, user: {}, isAuth: false }

    case CHANGE_VISIBILITY_USER:
      return { ...state, user: { ...state.user, visibility: action.payload } }

    case INIT_USER:
      return { ...state, user: action.payload }

    case UPDATE_USER:
      // console.log(action.payload);
      return { ...state, user: action.payload.user }

    // case INIT_USER_TAGS:
    //   return { ...state, tags: action.payload }

    case ADD_FRIEND:
      return { ...state, user: { ...state.user, friends: [...state.user.friends, action.payload] } }

    case REMOVE_FRIEND:
      console.log(state.user.friends.filter(el => el._id !== action.payload));
      return { ...state, user: { ...state.user, friends: state.user.friends.filter(el => el._id !== action.payload) } }

    default:
      return state
  }
}

export default userReducer
