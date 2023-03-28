import {setUser,startLoading} from '../slice/userSlice';


export const userLogin = () => async (dispatch) => {
    try {
        // logic
        dispatch(setUser({username:'Rahul'}));
    } catch (error) {
        
    }
}