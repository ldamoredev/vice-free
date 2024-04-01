import { Button, StyleSheet, Text, View } from 'react-native'
import { ScreenDefinition } from '../../navigation/navigator/ScreenDefinition'
import { ScreenVisibilities } from '../../navigation/navigator/ScreenVisibilities'
import { useAppContext } from '../../context/AppContext'

export function AppScreen() {
    const { authenticator } = useAppContext()
    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <Button title="Logearme" onPress={async () => await authenticator.login('Lautaro')} />
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
