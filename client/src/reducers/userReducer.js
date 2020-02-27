const defaultState = {
  user: {},
  loading: false
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
      case "GET_USER_DATA":
          return {user: action.data, loading: false};
      case "LOADING_DATA":
          return {...state, loading: true};
      default:
          return state;
  }
}

export default userReducer;