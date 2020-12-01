import {combineReducers} from 'redux';
import summaryReducer from './summaryReducer';
import listReducer from './listReducer';
import playGameReducer from './playGameReducer';
import fakeQuestionList from './FakeQuestionList';
const rootReducer = combineReducers({
    summary: summaryReducer,
    list: listReducer,
    playGame: playGameReducer,
    fake: fakeQuestionList
});

export default rootReducer;
