import React from 'react'
const AuthContext = React.createContext()

function AuthProvider({children}) {
    const [user,setUser] = React.useState(()=>{
        const savedUser = localStorage.getItem('admin')
        return savedUser? JSON.parse(savedUser) : null
    })

    const getUser =()=>{
        if(!user) return user;
        return user.user;
    }
    const userLogin = user=>{
        setUser(user);
        localStorage.setItem('admin', JSON.stringify(user));
    }
    const userLogout = () => {
        setUser(null);
        localStorage.removeItem('admin');
      };
    const getToken = ()=>{
        return user.token
    }
    const contextValue = {
        user,
        getToken,
        getUser,
        userLogin,
        userLogout
    }
    
    return <AuthContext.Provider value = {contextValue}>
        {children}
    </AuthContext.Provider>
}
export default AuthContext

export function useAuth() {
    return React.useContext(AuthContext)
}

export {AuthProvider}