import {combineReducers} from 'redux';
import summaryReducer from './summaryReducer';
import listReducer from './listReducer';
import playGameReducer from './playGameReducer';
import getQuestionReducer from './getQuestionReducer';

import fakeQuestionList from './FakeQuestionList';
const rootReducer = combineReducers({
    summary: summaryReducer,
    list: listReducer,
    playGame: playGameReducer,
    getQuestion: getQuestionReducer,
    fake: fakeQuestionList
});

export default rootReducer;
