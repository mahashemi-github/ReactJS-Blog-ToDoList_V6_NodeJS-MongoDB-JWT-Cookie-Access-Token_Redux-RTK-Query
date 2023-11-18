import { createContext, useReducer,useEffect } from 'react'

export const AuthContext = createContext({})

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { userco: action.payload }
    case 'LOGOUT':
      return { userco: null }
    default:
      return state
  }
}
  
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { userco: null })

  useEffect( () => {
    const fetchOnloadAuth = async () => {
      const response = await fetch('/api/onloadauth')
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'LOGIN', payload: json }) 
      } else {
        dispatch({ type: 'LOGOUT' })
      }      
    }
    fetchOnloadAuth()
  }, [])

  console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
    { children }
    </AuthContext.Provider>
  )
}
