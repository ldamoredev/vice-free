import { Text, View } from 'react-native'
import { useAppContext } from '../../../context/AppContext'
import { TextField } from '../../../components/textFields/TextField'
import { FilledButton } from '../../../components/buttons/FilledButton'
import { ScreenDefinition } from '../../../navigation/navigator/ScreenDefinition'
import { ScreenVisibilities } from '../../../navigation/navigator/ScreenVisibilities'
import { styled } from '@nbottarini/react-native-styled'
import { rv } from '../../../components/rv'

export const CreateProfileScreen = () => {
    const { authenticator } = useAppContext()
    return (
        <Container>
            <Text>Open up App.tsx to start working on your app!</Text>
            <TextField
                autoCapitalize={'none'}
                autoFocus={true}
                label={'Nombre de usuario'}
                value={''}
                errorText={''}
                onChangeText={value => console.log(value)}
            />
            <FilledButton title="Logearme" onPress={async () => await authenticator.login('Lautaro')}/>
        </Container>
    )
}

export const CreateProfileScreenDefinition: ScreenDefinition = {
    path: '/createProfile',
    component: CreateProfileScreen,
    visibility: ScreenVisibilities.Anonymous,
    options: { headerShown: false },
}

const Container = styled(View, {
    flex: 1,
    paddingHorizontal: rv(16),
    justifyContent: 'center',
})
