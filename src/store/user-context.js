import { createContext, useEffect, useState } from "react";

//import { dummyAdmin } from "./dummy/dummy-users";
import { dummyUser } from "./dummy/dummy-users";

export const UserContext = createContext({
    user: null,
    isAdmin: false,
    setUser: () => {},
    setIsAdmin: () => {},
    updateUser: () => {},
    logOutUser: () => {}
});

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setUser(dummyUser);
        //setIsAdmin(true);
        setIsLoading(false);
    }, []);

    const updateUser = (data) => {
        console.log('update user method - user-context', data);
        setUser({...user, ...data});
    }

    const logOutUser = () => {
        setUser(null);
        setIsAdmin(false);
    }

    const value = {
        user,
        isAdmin,
        updateUser,
        logOutUser
    }

    return <UserContext.Provider value={value}>{!isLoading && children}</UserContext.Provider>;
}

export default UserContextProvider;