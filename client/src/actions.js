export const GET_USER_DATA = 'GET_USER_DATA';
export const LOADING_DATA = 'LOADING_DATA';
export const SEARCH_SONG = 'SEARCH_SONG';

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

export const searchSong = () => {
  return ({
      type: SEARCH_SONG
  })
}