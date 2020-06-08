import React, {useState, useContext, useEffect} from 'react';

const AuthUserContext = React.createContext();

// So we don't conflict with your localhost
const localStorageKey = 'ContactAppLogged';

export const AuthUserProvider = ({children}) => {
    const localStoreLogged = JSON.parse(localStorage.getItem(localStorageKey));
    const [logged, setLogged] = useState(localStoreLogged ? localStoreLogged.logged : false);

    useEffect(() => {
        if (logged) {
            localStorage.setItem(localStorageKey, JSON.stringify({logged: true}));
        } else {
            localStorage.removeItem(localStorageKey);
        }
    }, [logged]);

    return <AuthUserContext.Provider value={{logged, setLogged}}>{children}</AuthUserContext.Provider>
};

export const useAuthUser = () => {
    return useContext(AuthUserContext)
};
