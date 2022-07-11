import { SET_AUTH, SET_DB, SET_TODOS, SET_USER } from "./storeConstant"

export const setAuth = payload => {
  return {
    type: SET_AUTH,
    payload
  }
}

export const setUser = payload => {
  return {
    type: SET_USER,
    payload
  }
}

export const setTodos = payload => {
  return {
    type: SET_TODOS,
    payload
  }
}

export const setDB = payload => {
  return {
    type: SET_DB,
    payload
  }
}