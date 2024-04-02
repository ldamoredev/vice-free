import React, { FC } from 'react'
import { DialogButton, DialogButtonProps } from './DialogButton'

export const ConfirmButton: FC<DialogButtonProps> = (props) => {
    return (
        <DialogButton
            title={props.title ?? 'Confirmar'}
            type={props.type}
            onPress={props.onPress}
        />
    )
}
