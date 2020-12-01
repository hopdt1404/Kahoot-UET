const initialState = {
    list: [
        {
            timeLimit: 20,
            points: 1000,
            questionType: "Quiz",
            answerOption: "Single select",
            image: "",
            youtubeLink: "",
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
            youtubeLink: "",
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
            youtubeLink: "",
            questionContent: "1 + 1 = 2",
            answers: [
                {
                    answer: "",
                    correct: true
                },
                {
                    answer: "",
                    correct: false
                },
                {
                    answer: "",
                    correct: false
                },
                {
                    answer: "",
                    correct: false
                }
            ]
        }
    ],
};
  const fakeQuestionList = (state = initialState, action) => {
      switch(action.type){
          default:
              return state;
      }
  };
  
  export default fakeQuestionList;
