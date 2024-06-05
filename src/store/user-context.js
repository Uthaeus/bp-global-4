import { createContext, useEffect, useState } from "react";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { db, auth } from "../firebase";


export const UserContext = createContext({
    user: null,
    isAdmin: false,
    updateUser: () => {},
    logOutUser: () => {}
});

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return () => unsubscribe();
    }, []);

    const initializeUser = async (user) => {

        if (user) {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setUser({...userData, id: user.uid});
                if (userData.role === 'admin') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            }
        } else {
            setUser(null);
            setIsAdmin(false);
        }
        setIsLoading(false);
    }

    const updateUser = (data) => {
        console.log('update user method - user-context', data);
        setUser(data);
        updateDoc(doc(db, 'users', user.id), data);
    }

    const logOutUser = () => {
        signOut(auth);
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