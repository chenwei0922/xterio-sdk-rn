import { createContext, useContext, type FC, type PropsWithChildren } from "react";

interface IAuthContextProps{

}
interface IAuthContextState {

}
const initState = {

}

const AuthContext = createContext<IAuthContextState>(initState)

const AuthContextProvider: FC<PropsWithChildren<IAuthContextProps>> = (props) => {
  const {children, } = props

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useXterioAuthContext = () => {
  return useContext(AuthContext)
}