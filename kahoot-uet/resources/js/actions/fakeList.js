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
export const updatePlayer = (player) => {
  return {
    type: "UPDATE_PLAYER",
    payload: player,
  };
};
