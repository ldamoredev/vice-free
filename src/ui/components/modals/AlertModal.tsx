import React from 'react'
import { NavigationProps } from '../../navigation/NavigationProps'
import { AlertDialog } from '../dialogs/AlertDialog'
import { OkButton } from '../dialogs/buttons/OkButton'
import { ScreenDefinition } from '../../navigation/navigator/ScreenDefinition'
import { ScreenVisibilities } from '../../navigation/navigator/ScreenVisibilities'

export const AlertModal: React.FC<NavigationProps> = (props) => {
    const close = () => {
        props.navigation.goBack()
        const onClose = props.route.params?.['onClose']
        onClose?.()
    }
    return <AlertDialog
        title={props.route.params?.['title'] ?? 'Error'}
        content={props.route.params?.['message']}
        buttons={[<OkButton title={props.route.params?.['okTitle']} />]}
        onClose={close}
    />
}

export const AlertModalDefinition: ScreenDefinition = {
    path: '/modals/alert',
    component: AlertModal,
    visibility: ScreenVisibilities.Public,
    options: { gestureEnabled: false },
}
