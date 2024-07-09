import {ActionTypes} from "../constants/actionTypes"
import api from "../../apis/Twubric";


export const fetchUsers=()=> async(dispatch)=>{
        const response=await api.get();
        dispatch({type:ActionTypes.FETCH_USERS,payload:response.data});
    };
