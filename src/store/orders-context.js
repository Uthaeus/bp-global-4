import { useContext, useEffect, useState, createContext } from "react";

import { UserContext } from "./user-context";

import { getDocs, collection, deleteDoc, doc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const OrdersContext = createContext({
    orders: [],
    addOrder: () => {},
    deleteOrder: () => {},
    updateOrder: () => {}
});

const OrdersContextProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user, isAdmin } = useContext(UserContext);

    useEffect(() => {
        const getOrders = async () => {
            const querySnapshot = await getDocs(collection(db, "orders"));
            const orders = [];
            querySnapshot.forEach((doc) => {
                if (isAdmin) {
                    orders.push({ ...doc.data(), id: doc.id });
                } else {
                    if (doc.data().uid === user.id) {
                        orders.push({ ...doc.data(), id: doc.id });
                    }
                }
            });
            setOrders(orders);
        }
        if (user) {
            getOrders();
            setIsLoading(false);    
        } else {
            setOrders([]);
            setIsLoading(false);
        }
        
    }, [ user, isAdmin ]);

    const addOrder = async (order) => {
        const docRef = await addDoc(collection(db, "orders"), order);
        setOrders([...orders, { ...order, id: docRef.id }]);
    }

    const deleteOrder = (id) => {
        deleteDoc(doc(db, "orders", id));
        setOrders(orders.filter(order => order.id.toString() !== id.toString()));
    }

    const updateOrder = (order) => {
        updateDoc(doc(db, "orders", order.id), order);
        setOrders(orders.map(o => o.id.toString() === order.id.toString() ? order : o));
    }

    const value = {
        orders,
        addOrder,
        deleteOrder,
        updateOrder
    }

    return <OrdersContext.Provider value={value}>{!isLoading && children}</OrdersContext.Provider>;
}

export default OrdersContextProvider;