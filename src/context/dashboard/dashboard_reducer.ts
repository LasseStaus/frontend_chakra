// export enum UserActionType {
//     LOGIN = "LOGIN",
//     // REMOVE_TODO_ITEM = "REMOVE_TODO_ITEM",
//     // TOGGLE_COMPLETED = "TOGGLE_COMPLETED"
// }

import { Actions, ActionType, StateProps } from "./dashboard_state";

// // An interface for our actions
// interface UserActions {
//     type: UserActionType;
//     payload: any;
// }

// // An interface for our state
// export type StateProps = {
//     loggedInUser: any
// }

// export const actions = {
//     LOGIN: "LOGIN",
//     REMOVE_TODO_ITEM: "REMOVE_TODO_ITEM",
//     TOGGLE_COMPLETED: "TOGGLE_COMPLETED"
// };

export const initialState: StateProps = {
    loggedInUser: undefined
}

export const DashbaordReducer = (state: StateProps, action: Actions) => {
    switch (action.type) {
        case ActionType.GET_USER_DATA:
            console.log("VI ER INDE I REDUCER", action.payload);

            return { ...state, loggedInUser: action.payload }

        default:
            return state
    }
}