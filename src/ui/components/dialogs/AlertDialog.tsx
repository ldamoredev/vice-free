import React, { FC, ReactElement, ReactNode } from 'react'
import { Text, View } from 'react-native'
import { rv } from '../rv'
import { DialogButtonType } from './buttons/DialogButton'
import { Dialog } from './Dialog/Dialog'
import { OkButton } from './buttons/OkButton'
import { styled } from '@nbottarini/react-native-styled'

export const AlertDialog: React.FC<AlertDialogProps> = ({ icon, title, content, onClose, buttons, closeOnScrimPress }) => {
    let normalizedButtons = buttons
    if (!buttons || buttons.length === 0) {
        normalizedButtons = [<OkButton />]
    }
    return (
        <Dialog buttons={normalizedButtons} onClose={onClose} closeOnScrimPress={closeOnScrimPress}>
            <Container>
                <IconElement icon={icon} />
                <Headline>{title}</Headline>
                <ContentElement content={content} />
            </Container>
        </Dialog>
    )
}

AlertDialog.defaultProps = {
    closeOnScrimPress: true,
}

const IconElement: FC<{ icon: ReactElement }> = ({ icon }) => {
    if (React.isValidElement(icon)) return icon
    return null
}

const ContentElement: FC<{content?: ReactNode}> = ({ content }) => {
    if (typeof content === 'string') return <SupportingText>{content}</SupportingText>
    return content
}

const Container = styled(View, {
    alignItems: 'center',
    gap: rv(16),
})

const Headline = styled(Text, {
    fontFamily: 'Roboto-Medium',
    lineHeight: rv(24),
    fontSize: rv(16),
    color: '#0F0F0F',
    textAlign: 'center',
})

const SupportingText = styled(Text, {
    fontFamily: 'Roboto-Regular',
    lineHeight: rv(20),
    fontSize: rv(14),
    color: '#0F0F0F',
    textAlign: 'center',
})

export interface AlertDialogProps {
    icon?: ReactElement
    title: string
    content?: ReactNode
    closeOnScrimPress?: boolean
    onClose: () => void,
    buttons?: DialogButtonType[],
}
