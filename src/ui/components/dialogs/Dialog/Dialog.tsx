import React, { FC, PropsWithChildren } from 'react'
import { DialogButtonType } from '../buttons/DialogButton'
import { DialogButtons } from './DialogButtons'
import Modal from 'react-native-modal'
import { View } from 'react-native'
import { styled } from '@nbottarini/react-native-styled'
import { rv } from '../../rv'

export const Dialog: FC<DialogProps> = ({ closeOnScrimPress, onClose, buttons, children }) => {
    // noinspection RequiredAttributes
    return (
        <Modal
            isVisible={true}
            onBackdropPress={() => closeOnScrimPress && onClose?.()}
            backdropColor={'#000000'}
            backdropOpacity={0.4}
        >
            <Container>
                <Content>
                    {children}
                </Content>
                <DialogButtons buttons={buttons} onClose={onClose} />
            </Container>
        </Modal>
    )
}

const Container = styled(View, {
    backgroundColor: '#FFFFFF',
    borderRadius: rv(16),
})

const Content = styled(View, {
    paddingHorizontal: rv(24),
    paddingVertical: rv(24),
})

Dialog.defaultProps = {
    closeOnScrimPress: true,
}

export interface DialogProps extends PropsWithChildren {
    closeOnScrimPress?: boolean
    onClose?: () => void,
    buttons?: DialogButtonType[],
}
