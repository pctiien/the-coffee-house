import React from 'react'

const OrderContext = React.createContext()

export const OrderProvider = ({children})=>{

    const [order,setOrder] = React.useState({
        user : {},
        address: '',
        paymentMethod : 'cash',
        deliveryTime: {},
        orderItemIds: [{}],
        status: 'Pending',
        voucherUsed : null
    })

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    );
}

export const useOrder = () => React.useContext(OrderContext);
