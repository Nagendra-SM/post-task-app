import { createContext, useReducer, useContext } from "react";
const AppStateContext = createContext();
const AppDispatchContext = createContext();

const InitialState = {
    posts: [],
    view: "grid",
}

function reducer(state, action) {
    switch (action.type) {
        case "SET_POSTS":
            return {
                ...state,
                posts: action.payload,
            }
        case "REMOVE_POST":
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload),
            }
        case "TOGGLE_VIEW":
            return {
                ...state,
                view: state.view === "grid" ? "list" : "grid",
            }
        default:
            return state;
    }
}

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, InitialState);
    return (
        <AppDispatchContext.Provider value={dispatch}>
            <AppStateContext.Provider value={state}>
                {children}
            </AppStateContext.Provider>
        </AppDispatchContext.Provider>
    )
}

export function useAppDispatch(){
    return useContext(AppDispatchContext);
}

export function useAppState(){
    return useContext(AppStateContext);
}