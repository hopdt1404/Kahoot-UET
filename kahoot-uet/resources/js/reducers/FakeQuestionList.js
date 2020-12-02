const initialState = {
    currentQuestion: 0,
    topPlayer: [],
    listPlayer: [],
    listQuestion: [
        
    ]
};
const fakeQuestionList = (state = initialState, action) => {
    switch (action.type) {
        case "SET_QUESTION_LIST":{
            const newList = [...action.payload];
            return {
                ...state, listQuestion: newList
            };
        }
        case "ADD_PLAYERS": {
            const players = [...action.payload];
            console.log(players);
            return {
                ...state, listPlayer: players
            }
        }
        case "UPDATE_PLAYER": {
            const id = action.payload.id;
            const newScore = action.payload.score;
            const newListPlayer = [...state.listPlayer];
            const indexOfPlayer = state.listPlayer.findIndex(player => player.id = id);
            const newPlayer = {...newListPlayer[indexOfPlayer],score : newScore};
            newListPlayer.splice(indexOfPlayer,1,newPlayer);
            newListPlayer.sort((p1,p2) => (p1.score < p2.score) ? 1 : ((p2.score < p1.score) ? -1 : 0)); 
            const newTopPlayer = newListPlayer.slice(0,3);
            return {
                ...state,
                topPlayer: newTopPlayer,
                listPlayer: newListPlayer
            }
        }
        case "CHANGE_QUESTION":{
            return {
                ...state, currentQuestion: action.payload
            }
        }
        default:
            return state;
    }
};

export default fakeQuestionList;