export const GET_USER_DATA = 'GET_USER_DATA';
export const LOADING_DATA = 'LOADING_DATA';
export const SEARCH_SONG = 'SEARCH_SONG';
export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const PLAY_SONG = 'PLAY_SONG';
export const GET_LIBRARY = 'GET_LIBRARY';
export const SAVE_SONG = 'SAVE_SONG';
export const SHARE_SONG = 'SHARE_SONG';

export const getUserData = (userID) => (dispatch) => {
  dispatch(loadingData());
  fetch('/users/info?id=' + userID)
    .then(res => res.json())
    .then(data => dispatch({type: GET_USER_DATA, data}))
}

export const loadingData = () => {
  return ({
      type: LOADING_DATA
  })
}

export const searchSong = (input, userID) => (dispatch) => {
  fetch('/songs/search?id=' + userID + '&searchString=' + input)
    .then(res => res.json())
    .then(data => dispatch({type: SEARCH_SONG, input, data}))
}

export const requestSearch = (input) => (dispatch) => {
  dispatch ({
      type: REQUEST_SEARCH, input
  })
}

export const getLibrary = (userID) => (dispatch) => {
  dispatch(loadingData());
  fetch('/users/get-library?id=' + userID)
    .then(res => res.json())
    .then(data => dispatch({type: GET_LIBRARY, data}))
}

export const saveSong = (userID, songID) => (dispatch) => {
  fetch('')
    .then(res => res.json())
    .then(data => dispatch({type: GET_LIBRARY, data}))
}

export const shareSong = (userID, songID) => (dispatch) => {
  fetch('')
    .then(res => res.json())
    .then(data => dispatch({type: GET_LIBRARY, data}))
}