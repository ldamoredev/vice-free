import React, { FC, useState } from 'react'
import { FilledTextField } from './FilledTextField/FilledTextField'
import { InputModeOptions, KeyboardTypeOptions } from 'react-native'

export const PasswordField: FC<PasswordFieldProps> = (props) => {
    const hasError = !!props.errorText
    const [showPassword, setShowPassword] = useState(false)
    return (
        <FilledTextField
            {...props}
            secureTextEntry={!showPassword}
            onTrailingIconPress={() => setShowPassword(!showPassword)}
            error={hasError}
            supportingText={hasError ? props.errorText : props.supportingText}
            keyboardType="default"
        />
    )
}

export interface PasswordFieldProps {
    value?: string,
    disabled?: boolean
    editable?: boolean
    label?: string
    errorText?: string
    supportingText?: string
    autoFocus?: boolean
    keyboardType?: KeyboardTypeOptions
    inputMode?: InputModeOptions
    maxLength?: number
    onLeadingIconPress?: () => void
    onChangeText?: (text: string) => void
    onFocus?: (args: any) => void
    onBlur?: (args: any) => void
}
