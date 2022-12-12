import actions from "../actions/actionTypes";

const initialState = {
    user: {},
    posts: [],
    snackInformation: {
        open: false,
        message: "",
        type: "success"
    }
}
const appReducer: any = (state = initialState, action: any) => {
    //console.log(action.type, action.payload)
    switch (action.type) {
        case actions.SAVE_USER: return {
            ...state, user: action.payload
        }
        case actions.FOLLOWING_POSTS: return {
            ...state, posts: action.payload
        }
        case actions.SHOW_INFORATION: return {
            ...state, snackInformation: action.payload
        }
        default: {
            return state
        }
    }
}
export default appReducer;