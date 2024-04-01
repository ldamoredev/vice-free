import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Estas son las settings</Text>
            <StatusBar style="auto"/>
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
