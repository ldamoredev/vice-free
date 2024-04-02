import { StyleSheet, Text, View } from 'react-native'
import { ScreenDefinition } from '../../navigation/navigator/ScreenDefinition'
import { ScreenVisibilities } from '../../navigation/navigator/ScreenVisibilities'
import { useAppContext } from '../../context/AppContext'
import { TextField } from '../../components/textFields/TextField'
import { FilledButton } from '../../components/buttons/FilledButton'
import { TextButton } from '../../components/buttons/TextButton'

export function AppScreen() {
    const { authenticator } = useAppContext()
    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <TextField
                autoCapitalize={'none'}
                autoFocus={true}
                label={'Nombre'}
                value={''}
                errorText={''}
                onChangeText={value => console.log(value)}
            />
            <FilledButton title="Logearme" onPress={async () => await authenticator.login('Lautaro')}/>
            <TextButton title="Text Button" onPress={() => console.log('waste')}/>
        </View>
    )
}

export const AppScreenDefinition: ScreenDefinition = {
    path: '/home',
    component: AppScreen,
    visibility: ScreenVisibilities.Anonymous,
    options: { headerShown: false },
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
})
