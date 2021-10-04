let reducer = (state = 0, action) => {
    //reducer takes two argument 
    // 1. intial state
    // 2. Action

    switch (action.type) {
      case "INCREMENT":
        return state + 1; 
      case "DECREMENT":
            return state-1;
  
      default:
        return state;
    }
  };
  
  export default reducer;