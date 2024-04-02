import React, { FC, ReactElement } from 'react'
import { Button } from 'react-native'

export const DialogButton: FC<DialogButtonProps> = (props) => {
    return (
        <Button
            title={props.title ?? 'Aceptar'}
            onPress={props.onPress}
        />
    )
}

export interface DialogButtonProps {
    type?: DialogButtonTypes,
    title?: string,
    onPress?: () => void,
}

export enum DialogButtonTypes {
    Primary,
    Secondary,
}

export type DialogButtonType = ReactElement<DialogButtonProps>
