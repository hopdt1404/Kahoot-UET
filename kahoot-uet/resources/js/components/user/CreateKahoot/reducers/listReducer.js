const initialState = {
  qlist: [
    {
      clone: 0,
      timeLimit: 20,
      points: 1000,
      questionType: "Quiz",
      answerOption: "Single select",
      image: "",
      youtubeLink: "",
      questionContent: "",
      answers: [
        {
          answer: "",
          correct: false,
        },
        {
          answer: "",
          correct: false,
        },
        {
          answer: "",
          correct: true,
        },
        {
          answer: "",
          correct: false,
        },
      ],
    },
  ],
  order: 0,
};

const listReducer = (state = initialState, action) => {
  const type = action.type;
  const payload = action.payload;
  switch (type) {
    case "SET_NEW_ORDER": {
      state.order = payload;
      return state;
    }
    case "ADD_QUESTION": {
      const newQuestion = {
        clone: 0,
        timeLimit: 20,
        points: 1000,
        questionType: payload,
        answerOption: "Single select",
        image: "",
        youtubeLink: "",
        questionContent: "",
        answers: payload==="Quiz"?[
          {
            answer: "",
            correct: false,
          },
          {
            answer: "",
            correct: false,
          },
          {
            answer: "",
            correct: false,
          },
          {
            answer: "",
            correct: false,
          },
        ]:[
          {
            answer: "",
            correct: false,
          },
          {
            answer: "",
            correct: false,
          },
        ],
      };
      const newOrder = state.qlist.length;
      const newList = [...state.qlist];
      newList.push(newQuestion);
      return {
        order: newOrder,
        qlist: newList,
      };
    }
    case "DUPLICATE_QUESTION": {
      const newList = [...state.qlist];
      const newQuestion = {...newList[payload],clone: newList[payload].clone+1}
      newList.splice(payload, 0, newQuestion);
      return {
        order: payload + 1,
        qlist: newList,
      };
    }
    case "REMOVE_QUESTION": {
      const newList = [...state.qlist];
      console.log("Length",newList.length);
      console.log("Delete",payload);
      const newOrder =
        payload === state.qlist.length - 1 ? payload - 1 : payload;
      console.log("New Order",newOrder);
      newList.splice(payload, 1);
      return {
        order: newOrder,
        qlist: newList,
      };
    }
    case "MOVE_QUESTION": {
      const newList = [...state.qlist];
      return {
        ...state,
        qList: newList,
      };
    }
    case "SET_QUESTION_CONTENT":{
      const newList = [...state.qlist];
      const newQuestion = {...newList[payload.orderNumber],questionContent: payload.content}
      newList.splice(payload.orderNumber, 1, newQuestion);
      return {
        // order: payload.orderNumber,
        ...state,
        qlist: newList,
      };
  }
    case "SET_TIME_LIMIT": {
      const newList = [...state.qlist];
      const newQuestion = {...newList[payload.orderNumber], timeLimit: payload.timeLimit}
      newList.splice(payload.orderNumber, 1, newQuestion);
      return {
        ...state,
        qlist: newList,
      };
    }
    case "SET_POINTS": {
      const newList = [...state.qlist];
      const newQuestion = {...newList[payload.orderNumber], points: payload.points}
      newList.splice(payload.orderNumber, 1, newQuestion);
      return {
        ...state,
        qlist: newList,
      };
    }
    case "SET_ANSWER_OPTION": {
      const newList = [...state.qlist];
      const newQuestion = {...newList[payload.orderNumber], answerOption: payload.answerOption}
      newList.splice(payload.orderNumber, 1, newQuestion);
      return {
        ...state,
        qlist: newList,
      };
    }
    case "SET_IMAGE": {
      const newList = [...state.qlist];
      const newQuestion = {...newList[payload.orderNumber], image: payload.image}
      newList.splice(payload.orderNumber, 1, newQuestion);
      return {
        ...state,
        qlist: newList,
      };
    }
    case "SET_YOUTUBE_LINK": {
      const newList = [...state.qlist];
      const newQuestion = {...newList[payload.orderNumber], youtubeLink: payload.link}
      newList.splice(payload.orderNumber, 1, newQuestion);
      return {
        ...state,
        qlist: newList,
      };
    }
    case "SET_ANSWER": {
      const newList = [...state.qlist];
      const newAnswers = [...newList[payload.orderNumber].answers];
      newAnswers.splice(payload.aOrderNumber, 1, {
        answer: payload.answer,
        correct: newAnswers[payload.aOrderNumber].correct
      });
      const newQuestion = {...newList[payload.orderNumber], answers: newAnswers}
      newList.splice(payload.orderNumber, 1, newQuestion);
      return {
        ...state,
        qlist: newList,
      };
    }
    case "SET_CORRECT_ANSWER": {
      const newList = [...state.qlist];
      const newAnswers = [...newList[payload.orderNumber].answers];
      newAnswers.splice(payload.aOrderNumber, 1, {
        answer: newAnswers[payload.aOrderNumber].answer,
        correct: !newAnswers[payload.aOrderNumber].correct
      });
      const newQuestion = {...newList[payload.orderNumber], answers: newAnswers}
      newList.splice(payload.orderNumber, 1, newQuestion);
      console.log(newList[state.order].answers);
      return {
        ...state,
        qlist: newList,
      };
    }
    default:
      return state;
  }
};
export default listReducer;
