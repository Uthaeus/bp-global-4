import { createContext, useContext, useEffect, useState } from "react";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

import { UserContext } from "./user-context";

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
        const getUsers = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({ ...doc.data(), id: doc.id });
            });
            setUsers(users);
        }
        if (isAdmin) {
            getUsers();
            setIsLoading(false);
        } else {
            setUsers([]);
            setIsLoading(false);
        }
        
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