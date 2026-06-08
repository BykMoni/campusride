import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = useState(null)
  const [token, setToken] = useState(null)

  const login = async (userData, authToken) => {
    // TODO: API call — Save token and user details to AsyncStorage
    // await AsyncStorage.setItem('token', authToken)
    // await AsyncStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    setToken(authToken)
  }

  const logout = async () => {
    // TODO: API call — Clear persistent storage tracking payloads
    // await AsyncStorage.removeItem('token')
    // await AsyncStorage.removeItem('user')
    setUser(null)
    setToken(null)
  }

  const isLoggedIn = !!token
  const role = user?.role || null

  return (
    <AuthContext.Provider value={{ user, token, role, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}

export default AuthContext