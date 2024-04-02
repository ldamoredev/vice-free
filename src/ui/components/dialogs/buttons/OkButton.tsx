import React, { FC } from 'react'
import { DialogButton, DialogButtonProps } from './DialogButton'

export const OkButton: FC<DialogButtonProps> = (props) => {
    return (
        <DialogButton
            title={props.title ?? 'Aceptar'}
            type={props.type}
            onPress={props.onPress}
        />
    )
}
