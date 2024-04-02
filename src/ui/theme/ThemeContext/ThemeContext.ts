import React, { useContext } from 'react'
import { Theme } from '../Theme'
import { defaultTheme } from '../themes/defaultTheme'

export interface ThemeContextValue {
    theme: Theme
}

export const ThemeContext = React.createContext<ThemeContextValue>({ theme: defaultTheme })

export const useTheme = () => useContext(ThemeContext)
