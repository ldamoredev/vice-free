import React from 'react'
import { GestureResponderEvent, Pressable, Text, TextStyle, View } from 'react-native'
import { rgba } from '../color'
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import { styled } from '@nbottarini/react-native-styled'
import { rv } from '../rv'
import { themedPressable } from '../../theme/themed'

export const TextButton: React.FC<TextButtonProps> = (props) => {
    return (
        <Pressable onPress={props.onPress} disabled={props.disabled} style={props.style}>
            {({ pressed }) => (
                <Container disabled={props.disabled} pressed={pressed}>
                        <StateLayer style={props.contentStyle}>
                            <Label
                                pressed={pressed}
                                disabled={props.disabled}
                                numberOfLines={1}
                                allowFontScaling={false}
                                ellipsizeMode="tail"
                                style={props.labelStyle}
                            >
                                {props.title}
                            </Label>
                            {props.trailingComponent}
                        </StateLayer>
                </Container>
            )}
        </Pressable>
    )
}

const Container = themedPressable(View, () => ({
    paddingVertical: rv(10),
}), ({ theme }) => ({
    borderRadius: rv(4),
    backgroundColor: rgba(theme.primaryColor, 0.12),
}))

const StateLayer = styled(View, {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rv(8),
    paddingHorizontal: rv(12),
})

const Label = themedPressable(Text, ({ disabled, theme }) => ({
    fontFamily: 'Roboto-Medium',
    lineHeight: rv(24),
    fontSize: rv(16),
    letterSpacing: rv(0.15),
    flexShrink: 1,
    flexGrow: 0,
    textAlign: 'center',
    color: theme.primaryColor,
    ...(disabled ? {
        color: rgba('#0F0F0F', 0.38),
    } : {}),
}), ({ theme }) => ({
    color: theme.primaryColor,
}))

export interface TextButtonProps {
    title: string
    onPress?: (event: GestureResponderEvent) => void
    style?: ViewStyle
    contentStyle?: ViewStyle
    labelStyle?: TextStyle
    disabled?: boolean
    trailingComponent?: React.ReactElement
}
