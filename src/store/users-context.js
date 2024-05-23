import { createContext, useContext, useEffect, useState } from "react";

import { UserContext } from "./user-context";

import { dummyUsers } from "./dummy/dummy-users";

export const UsersContext = createContext({
    users: [],
    addUser: () => {},
    updateUser: () => {},
    deleteUser: () => {}
});

const UsersContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { isAdmin } = useContext(UserContext);

    useEffect(() => {
        if (isAdmin) {
            setUsers(dummyUsers);
        }
        setIsLoading(false);
    }, [ isAdmin ]);

    const addUser = (user) => {
        setUsers([...users, user]);
    }

    const updateUser = (user) => {
        setUsers(users.map(u => u.id === user.id ? user : u));
    }

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    }

    const value = {
        users,
        addUser,
        updateUser,
        deleteUser
    }

    return <UsersContext.Provider value={value}>{!isLoading && children}</UsersContext.Provider>;
}

export default UsersContextProvider;