import React from 'react'

const OrderContext = React.createContext()

export const OrderProvider = ({children})=>{

    const [order,setOrder] = React.useState({
        userId : '66fa5656fd016efcc20372c0',
        address: '',
        paymentMethod : '',
        deliveryTime: {},
        orderItemIds: [],
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
