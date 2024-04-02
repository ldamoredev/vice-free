import React, { FC } from 'react'
import { Animated, LayoutChangeEvent, StyleSheet, TextStyle, useWindowDimensions } from 'react-native'
import { TextFieldLabelBackground } from './TextFieldLabelBackground'
import { rv } from '../../../rv'

const BLUR_ANIMATION_DURATION = 180
const FOCUS_ANIMATION_DURATION = 150
const MD3_INPUT_PADDING_HORIZONTAL = 16

export const TextFieldLabel: FC<TextFieldLabelProps> = (props) => {
    const { width: windowWidth } = useWindowDimensions()
    const { current: labelAnimation } = React.useRef(new Animated.Value(props.isMinimized ? 0 : 1))
    const [labelLayout, setLabelLayout] = React.useState({ measured: false, width: 0, height: 0 })
    const { current: placeholderOpacityAnims } = React.useRef([new Animated.Value(0), new Animated.Value(1)])

    const lineHeight = rv(24)
    const fontSize = rv(16)
    const minimizedLineHeight = rv(16)
    const minimizedFontSize = rv(12)

    React.useEffect(() => {
        labelAnimation.stopAnimation()
        const toValue = props.isMinimized ? 0 : 1
        const duration = props.isMinimized ? BLUR_ANIMATION_DURATION : FOCUS_ANIMATION_DURATION
        Animated.timing(labelAnimation, { toValue, duration, useNativeDriver: true }).start()
    }, [props.isMinimized, labelAnimation])

    const top = minimizedLineHeight / 2
    const width = labelLayout.width
    const scale = minimizedLineHeight / lineHeight
    const translateX = -(width - width * scale) / 2 + (fontSize - minimizedFontSize)
    const translateY = -lineHeight / 2

    const handleLayoutAnimatedText = React.useCallback(
        (e: LayoutChangeEvent) => {
            const width = roundLayoutSize(e.nativeEvent.layout.width)
            const height = roundLayoutSize(e.nativeEvent.layout.height)

            if (width !== labelLayout.width || height !== labelLayout.height) {
                setLabelLayout({ width, height, measured: true })
            }
        },
        [labelLayout.height, labelLayout.width],
    )

    const labelStyle: Animated.WithAnimatedObject<TextStyle> = {
        fontFamily: 'Roboto-Regular',
        fontSize: fontSize,
        lineHeight: lineHeight,
        opacity: labelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [(props.focused || props.error) ? 1 : 0, 0],
        }),
        transform: [
            {
                translateY: labelAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [translateY, 0],
                }),
            },
            {
                scale: labelAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [scale, 1],
                }),
            },
        ],
    }

    const commonStyles: Animated.WithAnimatedArray<TextStyle> = [
        {
            position: 'absolute',
            left: 0,
            top: top,
            textAlign: 'left',
            // backgroundColor: 'yellow',
        },
        labelStyle,
    ]

    return (
        // Position colored placeholder and gray placeholder on top of each other and crossfade them
        // This gives the effect of animating the color, but allows us to use native driver
        <Animated.View
            pointerEvents="none"
            style={[
                StyleSheet.absoluteFill,
                {
                    zIndex: 3,
                    width: windowWidth,
                    opacity: labelLayout.measured ? 1 : 0, //props.opacity,
                    transform: [
                        {
                            translateX: labelAnimation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [translateX, 0],
                            }),
                        },
                    ],
                },
            ]}
        >
            {props.backgroundColor && (
                <TextFieldLabelBackground
                    labeled={labelAnimation}
                    labelLayoutWidth={width}
                    labelStyle={labelStyle}
                    topPosition={top}
                    label={props.label}
                    backgroundColor={props.backgroundColor}
                />
            )}
            <ActiveText
                onLayout={handleLayoutAnimatedText}
                numberOfLines={1}
                allowFontScaling={false}
                style={[
                    commonStyles,
                    { color: props.error ? props.errorColor : props.focusedColor },
                    props.disabled ? ({ color: props.disabledColor }) : null,
                ]}
            >
                {props.label}
            </ActiveText>
            <InactiveText
                onLayout={handleLayoutAnimatedText}
                numberOfLines={1}
                allowFontScaling={false}
                style={[
                    commonStyles,
                    {
                        color: props.error ? props.errorColor : props.placeholderColor,
                        opacity: props.focused || props.error
                            ? labelAnimation
                            : placeholderOpacityAnims[labelLayout.measured ? 1 : 0],
                        maxWidth: windowWidth - MD3_INPUT_PADDING_HORIZONTAL,
                    },
                    props.disabled ? ({ color: props.disabledColor }) : null,
                ]}
            >
                {props.label}
            </InactiveText>
        </Animated.View>
    )
}

const InactiveText = Animated.Text
const ActiveText = Animated.Text

export interface TextFieldLabelProps {
    label: string
    isMinimized: boolean
    placeholderColor: string
    backgroundColor?: string
    focusedColor: string
    errorColor: string
    disabledColor: string
    error: boolean
    disabled: boolean
    focused: boolean
}

const roundLayoutSize = (size: number): number => Math.round(size * 1000) / 1000
