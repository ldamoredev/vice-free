import { DefaultTheme, NavigationContainer, Theme as NavigationTheme } from '@react-navigation/native'
import React, { FC, useMemo, useRef } from 'react'
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { ScreenDefinition } from './navigator/ScreenDefinition'
import { ReactNavigator } from './navigator/ReactNavigator'
import { useIdentity } from '../auth/useIdentity'
import { TabsLayout } from '../layout/TabsLayout'
import { AppScreen } from '../screens/public/AppScreen'

const Stack = createNativeStackNavigator()

export const NavigationView: FC<Props> = ({ navigator }) => {
    const { isAuthenticated } = useIdentity()
    const routeNameRef = useRef<string>()
    const screens = useMemo(() => navigator.getScreens(isAuthenticated), [navigator, isAuthenticated])
    const modals = useMemo(() => navigator.getModals(isAuthenticated), [navigator, isAuthenticated])
    const navigationTheme: NavigationTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
        },
    }

    return (
        <NavigationContainer
            ref={navigator.ref}
            theme={navigationTheme}
            onReady={() => {
                routeNameRef.current = navigator.currentRoute?.path
            }}
        >
            <Stack.Navigator>
                {/*{screens.map(toScreen)}*/}
                {!isAuthenticated && (
                    <Stack.Group>
                        <Stack.Screen name="Home" component={AppScreen} options={{ headerShown: false }} />
                    </Stack.Group>
                )}
                {
                    isAuthenticated && (
                        <Stack.Group>
                            <Stack.Screen name="Main" component={TabsLayout} options={{ headerShown: false }} />
                        </Stack.Group>
                    )
                }
                {modals.length > 0 && (
                    <Stack.Group screenOptions={modalGroupOptions}>
                        {modals.map(toScreen)}
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const modalGroupOptions: NativeStackNavigationOptions = { presentation: 'transparentModal', headerShown: false }

const toScreen = (definition: ScreenDefinition) => (
    <Stack.Screen
        key={definition.path}
        name={definition.path}
        component={definition.component}
        options={{ title: '', ...definition.options }}
    />
)

interface Props {
    navigator: ReactNavigator
}
