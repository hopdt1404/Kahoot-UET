const initialState = {
    title: "",
    description: ""
  };
  const summaryReducer = (state = initialState, action) => {
      switch(action.type){
          case("SET_SUMMARY"):{
              return action.payload;
          }
          default:
              return state;
      }
  };
  
  export default summaryReducer;
