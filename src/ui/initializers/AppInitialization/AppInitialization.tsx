import React, { FC, ReactNode } from 'react'
import { usePresenter } from '@nbottarini/react-presenter'
import { AppInitializationPresenter } from './AppInitializationPresenter'
import { DefaultSplashScreen } from '../../components/DefaultSplashScreen'
import { useAppContext } from '../../context/AppContext'

const useAppInitializationPresenter = () => {
    const { authenticator } = useAppContext()
    return usePresenter((onChange) => new AppInitializationPresenter(onChange, authenticator))
}

export const AppInitialization: FC<Props> = (props) => {
    const Splash = DefaultSplashScreen
    const presenter = useAppInitializationPresenter()
    if (presenter.model.isLoading) return <Splash />
    return props.children
}

interface Props {
    children: ReactNode
}
