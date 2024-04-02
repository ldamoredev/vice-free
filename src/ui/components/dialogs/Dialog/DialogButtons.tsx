import { DialogButtonType } from '../buttons/DialogButton'
import React, { FC } from 'react'
import { View } from 'react-native'
import { styled } from '@nbottarini/react-native-styled'
import { rv } from '../../rv'

export const DialogButtons: FC<Props> = (props) => {
    if (!props.buttons) return null
    return (
        <Container>
            {props.buttons.map((it, i) =>
                <React.Fragment key={i}>
                    {React.cloneElement(it, {
                        ...it.props,
                        onPress: () => {
                            props.onClose?.()
                            it.props.onPress?.()
                        },
                    })}
                </React.Fragment>,
            )}
        </Container>
    )
}

const Container = styled(View, {
    paddingHorizontal: rv(24),
    paddingVertical: rv(16),
    gap: rv(8),
})

interface Props {
    buttons?: DialogButtonType[]
    onClose?: () => void
}
