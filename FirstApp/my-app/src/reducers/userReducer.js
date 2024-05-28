// src/reducers/userReducer.js
import { CREATE_USER } from '../actions/userActions';

const initialState = {
    users: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        default:
            return state;
    }
};

export default userReducer;