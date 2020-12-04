const initialState = {
    quiz: [],
    nickname: '',
    selectedPin: 0,
};

export default function playGame(state = initialState, action) {
    switch (action.type) {
        case 'SELECTED_QUIZ':
            return Object.assign({}, state, { quiz: action.payload })
        case 'NICKNAME':
            return Object.assign({}, state, { nickname: action.payload })
        case 'SELECTED_PIN':
            return Object.assign({}, state, { selectedPin: action.payload })
        default:
            return null;
            break;
    }
};

// export function selectedQuiz(quiz) {
//     return {
//         type: 'SELECTED_QUIZ',
//         payload: quiz
//     }
// }
// export function handleNickname(nickname) {
//     return {
//         type: 'NICKNAME',
//         payload: nickname
//     }
// }
// export function selectedPin(pin) {
//     return {
//         type: 'SELECTED_PIN',
//         payload: pin
//     }
// }