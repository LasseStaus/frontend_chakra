import { InitialStateType } from "./AuthContext";

export enum ActionTypes {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    // REMOVE_TODO_ITEM = "REMOVE_TODO_ITEM",
    // TOGGLE_COMPLETED = "TOGGLE_COMPLETED"
}

export interface Actions {
    type: ActionTypes;
    payload: any;
}

export const authReducer = (state: InitialStateType, action: Actions) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, loggedInUser: action.payload };
        case 'LOGOUT':
            return { ...state, loggedInUser: undefined };
        default:
            return state;
    }
}

// export const shoppingCartReducer = (state, action) => {
//     switch (action.type) {
//         case 'ADD_PRODUCT':
//             return state + 1;
//     }
// }