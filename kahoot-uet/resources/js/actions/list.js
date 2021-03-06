export const setNewOrder = (orderNumber) => {
    return {
        type: "SET_NEW_ORDER",
        payload: orderNumber,
    };
};
export const addQuestion = (qType) => {
    return {
        type: "ADD_QUESTION",
        payload: qType,
    };
};
export const duplicateQuestion = (orderNumber) => {
    return {
        type: "DUPLICATE_QUESTION",
        payload: orderNumber,
    };
};
export const removeQuestion = (orderNumber) => {
    return {
        type: "REMOVE_QUESTION",
        payload: orderNumber,
    };
};
export const moveQuestion = (order,newOrder) => {
    return {
        type: "MOVE_QUESTION",
        payload: {order,newOrder}
    }
};
export const setTimeLimit = (timeLimit, orderNumber) => {
    return {
        type: "SET_TIME_LIMIT",
        payload: {timeLimit, orderNumber}
    };
};
export const setPoints = (points, orderNumber) => {
    return {
        type: "SET_POINTS",
        payload: {points, orderNumber}
    };
};
export const setAnswerOption = (answerOption, orderNumber) => {
    return {
        type: "SET_ANSWER_OPTION",
        payload: {answerOption, orderNumber}
    };
};
export const setImage = (image, orderNumber) => {
    return {
        type: "SET_IMAGE",
        payload: {image, orderNumber}
    };
};
// export const setYoutubeLink = (link, orderNumber) => {
//     return {
//         type: "SET_YOUTUBE_LINK",
//         payload: {link, orderNumber}
//     };
// };
export const setAnswer = (answer, orderNumber, aOrderNumber) => {
    return {
        type: "SET_ANSWER",
        payload: {answer, orderNumber, aOrderNumber}
    };
};
export const setCorrectAnswer = (orderNumber, aOrderNumber) => {
    return {
        type: "SET_CORRECT_ANSWER",
        payload: {orderNumber, aOrderNumber}
    };
};
export const setQuestionContent = (content, orderNumber) => {
    return {
        type: "SET_QUESTION_CONTENT",
        payload: {content, orderNumber}
    }
}

//play game

export function selectedQuiz(quiz) {
    return {
        type: 'SELECTED_QUIZ',
        payload: quiz
    }
}
export function handleNickname(nickname) {
    return {
        type: 'NICKNAME',
        payload: nickname
    }
}
export function handlePin(pin) {
    return {
        type: 'SELECTED_PIN',
        payload: pin
    }
}

// get data then click play game
export function getQuestionsOfTopic(topic_id) {
    return {
        type: "GET_QUESTIONS_TOPIC",
        payload: topic_id
    }
}