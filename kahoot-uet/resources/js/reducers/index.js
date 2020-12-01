import {combineReducers} from 'redux';
import summaryReducer from './summaryReducer';
import listReducer from './listReducer';
import playGameReducer from './playGameReducer';
import getQuestionReducer from './getQuestionReducer';

const rootReducer = combineReducers({
    summary: summaryReducer,
    list: listReducer,
    playGame: playGameReducer,
    getQuestion: getQuestionReducer
});

export default rootReducer;
