export const setQuestionList = (questions) => {
  return {
    type: "SET_QUESTION_LIST",
    payload: questions,
  };
};
export const addPlayer = (players) => {
  return {
    type: "ADD_PLAYERS",
    payload: players,
  };
};
export const updatePlayer = (id, score) => {
  return {
    type: "UPDATE_PLAYER",
    payload: {id: id, score: score},
  };
};

export const changeQuestion = (number) => {
  return {
    type: "CHANGE_QUESTION",
    payload: number,
  };
};
