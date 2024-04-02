import React from 'react'
import { NavigationProps } from '../../navigation/NavigationProps'
import { useAppContext } from '../../context/AppContext'
import { useIdentity } from '../../auth/useIdentity'
import { RetryButton } from '../dialogs/buttons/RetryButton'
import { AlertDialog } from '../dialogs/AlertDialog'
import { ScreenDefinition } from '../../navigation/navigator/ScreenDefinition'
import { ScreenVisibilities } from '../../navigation/navigator/ScreenVisibilities'

export const InternalErrorModal: React.FC<NavigationProps> = (props) => {
    const { navigator } = useAppContext()
    const { isAuthenticated } = useIdentity()
    const retry = props.route.params.retry
    const buttons = retry ? [<RetryButton onPress={() => retry()} />] : []

    const close = () => {
        props.navigation.goBack()
        if (isAuthenticated) {
            props.navigation.navigate(navigator.initialRouteNames.private)
        }
    }
    return <AlertDialog
        title= {'Error Interno'}
        content= {'Hubo un error interno'}
        onClose={close}
        buttons={buttons}
    />
}

export const InternalErrorModalDefinition: ScreenDefinition = {
    path: '/modals/internalError',
    component: InternalErrorModal,
    visibility: ScreenVisibilities.Public,
    options: { gestureEnabled: false },
}
