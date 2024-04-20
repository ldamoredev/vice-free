import { Text, View } from 'react-native'
import { ScreenDefinition } from '../../navigation/navigator/ScreenDefinition'
import { ScreenVisibilities } from '../../navigation/navigator/ScreenVisibilities'
import { useAppContext } from '../../context/AppContext'
import { FilledButton } from '../../components/buttons/FilledButton'
import { styled } from '@nbottarini/react-native-styled'
import { rv } from '../../components/rv'

export const HomeScreen = () => {
    const { navigator } = useAppContext()
    return (
        <>
            <Container>
                <Title>Vice-Free</Title>
            </Container>
            <_FilledButton title="Empezar" onPress={() => navigator.navigate('/createProfile')}/>
        </>
    )
}

export const HomeScreenDefinition: ScreenDefinition = {
    path: '/home',
    component: HomeScreen,
    visibility: ScreenVisibilities.Anonymous,
    options: { headerShown: false },
}

const Container = styled(View, {
    flex: 1,
    paddingHorizontal: rv(16),
    justifyContent: 'center',
})

const Title = styled(Text, {
    fontFamily: 'Roboto-Bold',
    fontSize: rv(18),
    textAlign: 'center',
})

const _FilledButton = styled(FilledButton, {
    marginBottom: rv(40),
    marginHorizontal: rv(16),
})
