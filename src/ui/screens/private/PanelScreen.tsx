import { Button, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useAppContext } from '../../context/AppContext'

export const PanelScreen = () => {
    const { authenticator } = useAppContext()
    return (
        <View style={styles.container}>
            <Text>Este es el PANEL</Text>
            <Button title="Logout" onPress={async () => await authenticator.logout()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
