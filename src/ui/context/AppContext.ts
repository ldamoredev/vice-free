import React, { useContext } from 'react'
import { Context } from './Context'

export const AppContext = React.createContext<Context|undefined>(undefined)

export const useAppContext = () => useContext(AppContext)
