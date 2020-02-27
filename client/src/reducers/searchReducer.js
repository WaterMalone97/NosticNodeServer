const defaultState = {
  input: ''
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
      case "SEARCH_SONG":
          return {state};
      default:
          return state;
  }
}

export default userReducer;