import * as React from 'react'
import { FC } from 'react'
import { Animated, ColorValue } from 'react-native'

export const TextFieldLabelBackground: FC<Props> = (props) => {
    return (
        <Animated.Text
            style={[
                props.labelStyle,
                {
                    position: 'absolute',
                    top: props.topPosition + 2, // outlineWidth
                    left: -5, // 10/2
                    color: 'transparent',
                    paddingHorizontal: 0,
                    width: props.labelLayoutWidth + 10,
                    backgroundColor: props.backgroundColor,
                    opacity: props.labeled.interpolate({
                        inputRange: [0, 0.6],
                        outputRange: [1, 0],
                    }),
                    transform: [
                        ...props.labelStyle.transform,
                        {
                            scaleY: props.labeled.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.3, 1],
                            }),
                        },
                    ],
                    textAlign: 'left',
                },
            ]}
            numberOfLines={1}
            allowFontScaling={false}
        >
            {props.label}
        </Animated.Text>
    )
}

interface Props {
    labelStyle: any
    labeled: Animated.Value
    labelLayoutWidth: number
    topPosition: number
    label?: string | null
    backgroundColor?: ColorValue
}
