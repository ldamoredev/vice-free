import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { ScreenDefinition } from '../navigation/navigator/ScreenDefinition'
import { ScreenVisibilities } from '../navigation/navigator/ScreenVisibilities'

export function AppScreen() {
    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    )
}

export const AppScreenDefinition: ScreenDefinition = {
    path: '/home',
    component: AppScreen,
    visibility: ScreenVisibilities.Public,
    options: { headerShown: false },
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
