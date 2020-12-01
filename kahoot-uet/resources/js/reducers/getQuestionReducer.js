const initialState = {
    questions: []

};

export default function getQuestion(state = initialState, action) {
    switch (action.type) {
        case 'GET_QUESTIONS_TOPIC':
          return {
            ...state,
            questions: [...state.questions, action.payload],
          }
    
        default:
          return state
      }
};