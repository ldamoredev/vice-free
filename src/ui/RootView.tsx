import React, { FC } from 'react'
import { Context } from './context/Context'
import { AppContext } from './context/AppContext'
import { StatusBar } from 'react-native'
import { NavigationView } from './navigation/NavigationView'
import { AppInitialization } from './initializers/AppInitialization/AppInitialization'
import { UnhandledErrorProvider } from '@nbottarini/react-presenter'

export const RootView: FC<Props> = ({ context }) => {
    return (
        <AppContext.Provider value={context}>
            <UnhandledErrorProvider onUnhandledError={context.onUnhandledError}>
                <AppInitialization>
                    <StatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0)" translucent />
                    <NavigationView navigator={context.navigator} />
                </AppInitialization>
            </UnhandledErrorProvider>
        </AppContext.Provider>
    )
}

interface Props {
    context: Context
}
