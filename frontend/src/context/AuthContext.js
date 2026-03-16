// // import { createContext, useContext, useState } from "react"

// // const AuthContext = createContext()

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null)

// //   return (
// //     <AuthContext.Provider value={{ user, setUser }}>
// //       {children}
// //     </AuthContext.Provider>
// //   )
// // }

// // export const useAuth = () => useContext(AuthContext)

// import { createContext, useContext, useState, useEffect } from "react"

// const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {

// const [user,setUser] = useState(null)

// useEffect(()=>{

// const storedUser = localStorage.getItem("user")

// if(storedUser){
// setUser(JSON.parse(storedUser))
// }

// },[])

// const login = (userData,token)=>{

// localStorage.setItem("user",JSON.stringify(userData))
// localStorage.setItem("token",token)

// setUser(userData)

// }

// const logout = ()=>{

// localStorage.removeItem("user")
// localStorage.removeItem("token")

// setUser(null)

// }

// return(

// <AuthContext.Provider value={{user,setUser,login,logout}}>

// {children}

// </AuthContext.Provider>

// )

// }

// export const useAuth = ()=> useContext(AuthContext)
// import { createContext, useContext, useState } from "react"

// const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  // ✅ Instantly read user from localStorage on first load (no flicker)
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user")
      return storedUser ? JSON.parse(storedUser) : null
    } catch {
      return null
    }
  })

  // ✅ Sync if localStorage changes in another tab
  useEffect(() => {
    const handleStorage = () => {
      const storedUser = localStorage.getItem("user")
      setUser(storedUser ? JSON.parse(storedUser) : null)
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.setItem("token", token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuth = () => useContext(AuthContext)