

// An interface for our state
export interface StateProps {
    loggedInUser: loggedInUserProps
}

export interface loggedInUserProps {
    firstname: string
    lastname: string
    email: string
    phonenumber: number | null
}

export enum ActionType {
    GET_USER_DATA = "GET_USER_DATA",
    // REMOVE_TODO_ITEM = "REMOVE_TODO_ITEM",
    // TOGGLE_COMPLETED = "TOGGLE_COMPLETED"
}

// An interface for our actions
export interface Actions {
    type: ActionType;
    payload: any;
}

export const actions = {
    LOGIN: "LOGIN",
    // REMOVE_TODO_ITEM: "REMOVE_TODO_ITEM",
    // TOGGLE_COMPLETED: "TOGGLE_COMPLETED"
};