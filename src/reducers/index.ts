import coursePlanReducer from './coursePlan';
import playgroundReducer from './playground';
import forkDataReducer from './forkData';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    planDetails : coursePlanReducer,
    tempPlaygrounds : playgroundReducer,
    forkData: forkDataReducer
});

export default allReducers;