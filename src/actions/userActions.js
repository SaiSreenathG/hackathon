import { USER_LANGUAGE_CHANGE, USER_TOGGLE_MAP, USER_LOGGED_IN, USER_LOGOUT } from './types';
import store from '../store';

export const userLanguageCHange = (language) => dispatch => {
    // console.log(`userLanguageCHange: language: ${language}`);
    dispatch({
        type: USER_LANGUAGE_CHANGE,
        payload: language
    });
}

export const toggleMap = () => dispatch => {
    // console.log(`userToggleMap:`);
    dispatch({
        type: USER_TOGGLE_MAP,
        payload: {}
    });
}

export const loggedIn = ({_id, userName, email}) => dispatch => {
    // console.log(`user loggedIn`);
    dispatch({
        type: USER_LOGGED_IN,
        payload: {_id, userName, email}
    });
    localStorage.setItem('reduxState', JSON.stringify(  {user: store.getState().user}   ));
}

export const logout = () => dispatch => {
    // console.log(`user logout`);
    dispatch({
        type: USER_LOGOUT,
        payload: {}
    });
    localStorage.setItem('reduxState', JSON.stringify(  {user: store.getState().user}   )); 
}