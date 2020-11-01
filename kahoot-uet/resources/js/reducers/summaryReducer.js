const initialState = {
  title: "",
  description: "",
  saveLocation: "",
  coverImage: null,
};
const summaryReducer = (state = initialState, action) => {
    switch(action.type){
        case("SET_TITLE"):{
            state.title = action.payload;
            return state;
        }
        case("SET_DESCRIPTION"):{
            state.description = action.payload;
            return state;
        }
        case("SET_SAVE_LOCATION"):{
            state.saveLocation = action.payload;
            return state;
        }
        case("ADD_COVER_IMAGE"):{
            state.coverImage = action.payload;
            return state;
        }
        default:
            return state;
    }
};

export default summaryReducer;