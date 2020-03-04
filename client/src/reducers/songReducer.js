const defaultState = {

}

const songReducer = (state = defaultState, action) => {
  switch (action.type) {
      case "SAVE_SONG":
          return state;
      case "SHARE_SONG":
          return state;
      default:
          return state;
  }
}

export default songReducer;