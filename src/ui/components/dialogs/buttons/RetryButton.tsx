import React, { FC } from 'react'
import { DialogButton, DialogButtonProps } from './DialogButton'

export const RetryButton: FC<DialogButtonProps> = (props) => {
    return (
        <DialogButton
            title={props.title ?? 'Reintentar'}
            type={props.type}
            onPress={props.onPress}
        />
    )
}
