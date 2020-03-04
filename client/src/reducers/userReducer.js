const defaultState = {
  user: {},
  library: [],
  loading: false
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
      case "GET_USER_DATA":
          return {...state, user: action.data, loading: false};
      case "GET_LIBRARY":
          console.log("hit")
          return {...state, library: action.data, loading: false};
      case "LOADING_DATA":
          return {...state, loading: true};
      default:
          return state;
  }
}

export default userReducer;