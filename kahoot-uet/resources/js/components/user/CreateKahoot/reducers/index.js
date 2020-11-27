import {combineReducers} from 'redux';
import summaryReducer from './summaryReducer';
import listReducer from './listReducer'
const rootReducer = combineReducers({
    summary: summaryReducer,
    list: listReducer,
});

export default rootReducer;
