import { useContext, useEffect, useState, createContext } from "react";

import { UserContext } from "./user-context";

import { dummyOrders } from "./dummy/dummy-orders";

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
        if (user) {
            if (isAdmin) {
                setOrders(dummyOrders);
            } else {
                setOrders(dummyOrders.filter(order => order.uid === user.id));
            }
        }
        setIsLoading(false);
    }, [ user, isAdmin ]);

    const addOrder = (order) => {
        // add firestore add
        setOrders([...orders, order]);
    }

    const deleteOrder = (id) => {
        // add firestore delete
        setOrders(orders.filter(order => +order.id !== +id));
    }

    const updateOrder = (order) => {
        // add firestore update
        setOrders(orders.map(o => o.id === order.id ? order : o));
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