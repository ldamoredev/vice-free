import React from 'react'
import { GestureResponderEvent, Pressable, Text, TextStyle, View } from 'react-native'
import { rgba } from '../color'
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import { styledPressable } from '@nbottarini/react-native-styled'
import { rv } from '../rv'
import { themed } from '../../theme/themed'

export const FilledButton: React.FC<FilledButtonProps> = (props) => {
    return (
        <Pressable onPress={props.onPress} disabled={props.disabled} style={props.style}>
            {({ pressed }) => (
                <Container disabled={props.disabled}>
                        <StateLayer pressed={pressed} style={props.contentStyle}>
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
                        </StateLayer>
                </Container>
            )}
        </Pressable>
    )
}

const Container = themed(View, ({ disabled, theme }) => ({
    borderRadius: rv(4),
    backgroundColor: theme.primaryColor,
    ...(disabled ? {
        backgroundColor: rgba('#0F0F0F', 0.38),
    } : {}),
}))

const StateLayer = styledPressable(View, () => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rv(10),
    paddingHorizontal: rv(12),
    gap: rv(8),
}), () => ({
    backgroundColor: rgba('#FFFFFF', 0.12),
}))

const Label = styledPressable(Text, ({ disabled }) => ({
    fontFamily: 'Roboto-Medium',
    lineHeight: rv(24),
    fontSize: rv(16),
    letterSpacing: rv(0.15),
    flexShrink: 1,
    flexGrow: 0,
    textAlign: 'center',
    color: '#FFFFFF',
    ...(disabled ? {
        color: rgba('#0F0F0F', 0.38),
    } : {}),
}), () => ({
    color: '#FFFFFF',
}))

export interface FilledButtonProps {
    title: string
    onPress?: (event: GestureResponderEvent) => void
    style?: ViewStyle
    contentStyle?: ViewStyle
    labelStyle?: TextStyle
    disabled?: boolean
}
