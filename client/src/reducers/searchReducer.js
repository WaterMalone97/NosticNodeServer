const defaultState = {
  input: '',
  results: []
}

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
      case "SEARCH_SONG":
          return {input: action.input, results: action.data};
      case "REQUEST_SEARCH":
          return {...state, input: action.input};
      default:
          return state;
  }
}

export default searchReducer;