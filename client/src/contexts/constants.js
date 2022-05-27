export const apiUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'https://sleepy-inlet-56101.herokuapp.com/api'

export const LOCAL_STORAGE_TOKEN_NAME = 'iot'
