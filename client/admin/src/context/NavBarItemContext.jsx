import React from 'react'

const NavBarItemContext = React.createContext()

export const useNavBarItemContext = ()=> React.useContext(NavBarItemContext)

export const NavBarItemProvider = ({children})=>{
    const [selectedItem, setSelectedItem] = React.useState(null)
    return (
        <NavBarItemContext.Provider value={{selectedItem,setSelectedItem}}>
            {children}
        </NavBarItemContext.Provider>
    )
}