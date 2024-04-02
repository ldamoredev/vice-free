import React, { forwardRef } from 'react'
import { FilledTextField } from './FilledTextField/FilledTextField'
import { FlexAlignType, InputModeOptions, KeyboardTypeOptions, TextInput } from 'react-native'

export const TextField = forwardRef<TextInput, TextFieldProps>((props, ref) => {
    const hasError = !!props.errorText
    return (
        <FilledTextField
            autoCapitalize={props.autoCapitalize}
            ref={ref}
            {...props}
            error={hasError}
            supportingText={hasError ? props.errorText : props.supportingText}
            iconAlignment={props.iconAlignment}
            textAlignVertical={props.textAlignVertical}
            textPaddingBottom={props.textPaddingBottom}
        />
    )
})

export interface TextFieldProps {
    value?: string,
    defaultValue?: string
    disabled?: boolean
    editable?: boolean
    label?: string
    errorText?: string
    supportingText?: string
    autoFocus?: boolean
    keyboardType?: KeyboardTypeOptions
    inputMode?: InputModeOptions
    maxLength?: number
    leadingIconColor?: string
    onLeadingIconPress?: () => void
    trailingIconColor?: string
    onTrailingIconPress?: () => void
    iconAlignment?: FlexAlignType
    onChangeText?: (text: string) => void
    onFocus?: (args: any) => void
    onBlur?: (args: any) => void
    textAlign?: 'auto' | 'center' | 'left' | 'right' | 'justify'
    textAlignVertical?: 'auto' | 'center' | 'top' | 'bottom'
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
    textPaddingBottom?: number
    labelInputDefaultHeight?: boolean
    labelInputPaddingTop?: number
}
