import React, { FC } from 'react'
import { DialogButton, DialogButtonProps } from './DialogButton'

export const CancelButton: FC<DialogButtonProps> = (props) => {
    return (
        <DialogButton
            title={props.title ?? 'Cancelar'}
            type={props.type}
            onPress={props.onPress}
        />
    )
}
