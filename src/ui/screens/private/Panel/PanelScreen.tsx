import { Button, StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../../context/AppContext'
import { usePresenter } from '@nbottarini/react-presenter'
import { PanelPresenter } from './PanelPresenter'

const usePanelPresenter = () => {
    return usePresenter((onChange) => new PanelPresenter(onChange))
}

export const PanelScreen = () => {
    const { authenticator } = useAppContext()
    const presenter = usePanelPresenter()
    return (
        <View style={styles.container}>
            <Text>Este es el PANEL</Text>
            <Button title="Logout" onPress={async () => await authenticator.logout()} />
            <Button title="Romper" onPress={async () => await presenter.break()} />
            <Button title="Romper UI" onPress={async () => {
                throw new Error('xD')
            }} />
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
