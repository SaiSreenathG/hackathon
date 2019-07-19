import { USER_LOGGED_IN , USER_LOGOUT} from '../actions/types';

const initialState = {
    _id: null,
    name: null,
    email: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                _id: action.payload._id,
                name: action.payload.name,
                email: action.payload.email,
            }
        case USER_LOGOUT:
            return {
                ...state,
                _id: null,
                name: null,
                email: null
            }
        default:
            return state;
    }
}