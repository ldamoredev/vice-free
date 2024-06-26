import React, { FC } from 'react'
import { Context } from './context/Context'
import { AppContext } from './context/AppContext'
import { StatusBar } from 'react-native'
import { NavigationView } from './navigation/NavigationView'
import { AppInitialization } from './initializers/AppInitialization/AppInitialization'
import { UnhandledErrorProvider } from '@nbottarini/react-presenter'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeContext } from './theme/ThemeContext/ThemeContext'
import { defaultTheme } from './theme/themes/defaultTheme'

export const RootView: FC<Props> = ({ context }) => {
    return (
        <AppContext.Provider value={context}>
            <ThemeContext.Provider value={{ theme: defaultTheme }}>
                <SafeAreaProvider>
                    <UnhandledErrorProvider onUnhandledError={context.onUnhandledError}>
                        <AppInitialization>
                            <StatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0)" translucent />
                            <NavigationView navigator={context.navigator} />
                        </AppInitialization>
                    </UnhandledErrorProvider>
                </SafeAreaProvider>
            </ThemeContext.Provider>
        </AppContext.Provider>
    )
}

interface Props {
    context: Context
}
