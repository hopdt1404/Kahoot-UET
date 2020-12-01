const initialState = {
    questions: []
};

export default function getQuestion(state = initialState, action) {
    switch (action.type) {
        case 'GET_QUESTIONS_TOPIC':
            return Object.assign({}, state, { questions: action.payload })
        default:
            return null;
            break;
    }
};