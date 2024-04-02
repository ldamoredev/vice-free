import * as React from 'react'
import { forwardRef, MutableRefObject } from 'react'
import { FlexAlignType, Platform, Text, TextInput, View } from 'react-native'
import { ActiveIndicator } from './ActiveIndicator'
import { TextFieldLabel } from './Label/TextFieldLabel'
import { rgba } from '../../color'
import { rv } from '../../rv'
import { InputModeOptions, KeyboardTypeOptions } from 'react-native/Libraries/Components/TextInput/TextInput'
import { styled } from '@nbottarini/react-native-styled'
import { useTheme } from '../../../theme/ThemeContext/ThemeContext'

export const FilledTextField = forwardRef<TextInput, FilledTextFieldProps>((props, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(props.defaultValue)
    const isControlled = props.value !== undefined
    const value = isControlled ? props.value : uncontrolledValue
    const [focused, setFocused] = React.useState(false)
    const canEnterText = !props.disabled && props.editable
    const { theme } = useTheme()
    const inputTypeScale = {
        fontFamily: 'Roboto-Regular',
        lineHeight: rv(24),
        fontSize: rv(16),
        letterSpacing: rv(0.5),
    }
    const inputHeight = inputTypeScale.lineHeight
    const labelTypeScale =  {
        fontFamily: 'Roboto-Regular',
        lineHeight: rv(16),
        fontSize: rv(12),
        letterSpacing: rv(0.4),
    }
    const labelHeight = labelTypeScale.lineHeight
    const innerRef = React.useRef<TextInput>()
    const inputRef = (ref !== undefined ? ref : innerRef) as MutableRefObject<TextInput>

    const handleFocus = (args: any) => {
        if (!canEnterText) return
        setFocused(true)
        props.onFocus?.(args)
    }

    const handleBlur = (args: Object) => {
        setFocused(false)
        if (canEnterText) props.onBlur?.(args)
    }

    const handleChangeText = (value: string) => {
        if (!canEnterText) return
        if (!isControlled) setUncontrolledValue(value)
        props.onChangeText?.(value)
    }

    return (
        <View>
            <Container>
                <ActiveIndicator focused={focused} error={props.error} disabled={props.disabled} />
                <InputContainer>
                    {props.label && (
                        <TextFieldLabel
                            isMinimized={!!value || focused}
                            focused={focused}
                            error={props.error}
                            disabled={props.disabled}
                            label={props.label}
                            focusedColor={theme.primaryColor}
                            placeholderColor={'#0F0F0F'}
                            errorColor={'#C73641'}
                            disabledColor={rgba('#0F0F0F', 0.38)}
                        />
                    )}
                    <TextInput
                        autoCapitalize={props.autoCapitalize}
                        ref={inputRef}
                        autoFocus={props.autoFocus}
                        multiline={false}
                        value={value}
                        editable={!props.disabled && props.editable}
                        secureTextEntry={props.secureTextEntry}
                        keyboardType={props.keyboardType ?? (Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password')}
                        inputMode={props.inputMode}
                        maxLength={props.maxLength}
                        onChangeText={handleChangeText}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        cursorColor={theme.primaryColor}
                        selectionColor={theme.primaryColor}
                        underlineColorAndroid="transparent"
                        allowFontScaling={false}
                        style={[
                            {
                                ...(props.labelInputDefaultHeight ? { } : { height: inputHeight + labelHeight }),
                                paddingTop: props.labelInputPaddingTop ? props.labelInputPaddingTop : props.label ? labelHeight : (labelHeight / 2),
                                paddingBottom: props.label ? 0 : props.textPaddingBottom ?? (labelHeight / 2),
                                fontFamily: inputTypeScale.fontFamily,
                                lineHeight: inputTypeScale.lineHeight,
                                fontSize: inputTypeScale.fontSize,
                                letterSpacing: inputTypeScale.letterSpacing,
                                color: '#0F0F0F',
                                textAlignVertical: props.textAlignVertical ?? 'center',
                                textAlign: props.textAlign ?? 'left',
                                ...(props.disabled ? {
                                    color: rgba('#0F0F0F', 0.38),
                                } : {}),
                            },
                        ]}
                    />
                </InputContainer>
            </Container>
            <SupportingText
                numberOfLines={1}
                allowFontScaling={false}
                error={props.error}
                disabled={props.disabled}
            >
                {props.supportingText}
            </SupportingText>
        </View>
    )
})

FilledTextField.defaultProps = {
    editable: true,
    error: false,
    disabled: false,
}

const Container = styled(View, {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rv(8),
    paddingHorizontal: rv(12),
    gap: rv(16),
})

const InputContainer = styled(View, {
    flexGrow: 1,
    flexShrink: 1,
})

const SupportingText = styled(Text, ({ error, disabled }) => ({
    fontFamily: 'Roboto-Regular',
    lineHeight: rv(16),
    fontSize: rv(12),
    letterSpacing: rv(0.4),
    marginTop: rv(4),
    paddingHorizontal: rv(12),
    minHeight: rv(16),
    color: '#464646',
    ...(error ? {
        color: '#C73641',
    } : {}),
    ...(disabled ? {
        color: rgba('#0F0F0F', 0.38),
    } : {}),
}))

export interface FilledTextFieldProps {
    value?: string,
    defaultValue?: string
    disabled?: boolean
    editable?: boolean
    label?: string
    supportingText?: string
    error?: boolean
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
    autoFocus?: boolean
    secureTextEntry?: boolean
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
    textPaddingBottom?: number
    labelInputDefaultHeight?: boolean
    labelInputPaddingTop?: number
}
