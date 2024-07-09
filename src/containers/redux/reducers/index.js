import {combineReducers} from 'redux';
import { twubricReducers } from './twubricReducer';


 const reducers = combineReducers({
    allUsers: twubricReducers,
})
export default reducers