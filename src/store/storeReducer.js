import { SET_AUTH, SET_DB, SET_TODOS, SET_USER } from "./storeConstant";

const storeReducer = (state, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        auth: action.payload
      }
    case SET_USER:
      if (action.payload) {
        localStorage.setItem('todoUser', JSON.stringify(action.payload));
      }
      return {
        ...state,
        user: action.payload
      }
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload
      }
    case SET_DB:
      return {
        ...state,
        db: action.payload
      }
    default:
      throw new Error('Invalid action.')
  }
}

export default storeReducer;