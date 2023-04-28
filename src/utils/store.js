import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

const initialState = {
    darkMode: (Cookies.get('darkMode') === 'ON') || false,
    userInfo: Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")) : null, // { token, id, name, email, isAdmin  }
}


const reducer = (state, action) => {
    switch (action.type) {
        case "DARK_MODE_ON":
            Cookies.set('darkMode', 'ON');
            return { ...state, darkMode: true };
        case "DARK_MODE_OFF":
            Cookies.set('darkMode', 'OFF');
            return { ...state, darkMode: false };
        case "USER_LOGIN":
            Cookies.set("userInfo", JSON.stringify(action.data));
            return { ...state, userInfo: action.data };
        case 'USER_LOGOUT':
            console.log("log out");
            Cookies.remove('userInfo');
            return { ...state, userInfo: null }

        default:
            return state;
    }
}

export const Store = createContext();


export default function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Store.Provider value={{ state, dispatch }}>
        {children}
    </Store.Provider>
}