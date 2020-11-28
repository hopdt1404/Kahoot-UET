import {combineReducers} from 'redux';
import summaryReducer from './summaryReducer';
import listReducer from './listReducer';
import playGameReducer from './playGameReducer';
const rootReducer = combineReducers({
    summary: summaryReducer,
    list: listReducer,
    playGame: playGameReducer,
});

export default rootReducer;