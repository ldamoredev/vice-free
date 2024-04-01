import React, { FC } from 'react'
import { Context } from './context/Context'
import { AppContext } from './context/AppContext'
import { StatusBar } from 'react-native'
import { NavigationView } from './navigation/NavigationView'

export const RootView: FC<Props> = ({ context }) => {
    return (
        <AppContext.Provider value={context}>
            <StatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0)" translucent />
            <NavigationView navigator={context.navigator} />
        </AppContext.Provider>
    )
}

interface Props {
    context: Context
}