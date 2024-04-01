import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export const PanelScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Este es el PANEL</Text>
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
