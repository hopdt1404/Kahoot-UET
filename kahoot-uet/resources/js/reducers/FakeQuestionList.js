const initialState = {
    currentQuestion: 0,
    topPlayer: [],
    listPlayer: [],
    listQuestion: [
        {
            timeLimit: 20,
            points: 1000,
            questionType: "Quiz",
            answerOption: "Single select",
            image: "",
            questionContent: "1 + 1 = ?",
            answers: [
                {
                    answer: "0",
                    correct: false
                },
                {
                    answer: "2",
                    correct: true
                },
                {
                    answer: "1",
                    correct: false
                },
                {
                    answer: "3",
                    correct: false
                }
            ]
        },
        {
            timeLimit: 20,
            points: 1000,
            questionType: "Quiz",
            answerOption: "Single select",
            image: "",
            questionContent: "1 x 1 = ?",
            answers: [
                {
                    answer: "0",
                    correct: false
                },
                {
                    answer: "1",
                    correct: true
                },
                {
                    answer: "2",
                    correct: false
                },
                {
                    answer: "3",
                    correct: false
                }
            ]
        },
        {
            timeLimit: 20,
            points: 1000,
            questionType: "True or False",
            answerOption: "Single select",
            image: "",
            questionContent: "1 + 1 = 2",
            answers: [
                {
                    answer: "True",
                    correct: true
                },
                {
                    answer: "False",
                    correct: false
                }
            ]
        }
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
