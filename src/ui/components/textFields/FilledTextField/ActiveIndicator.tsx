import * as React from 'react'
import { FC } from 'react'
import { Animated } from 'react-native'
import { rgba } from '../../color'

export const ActiveIndicator: FC<Props> = ({ focused, error, disabled }) => {
    return (
        <Animated.View
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 1,
                zIndex: 1,
                backgroundColor: '#464646',
                // Underlines is thinner when input is not focused
                transform: [{
                    scaleY: focused || error
                        ? 2
                        : 1,
                }],
                ...(focused ? {
                    backgroundColor: 'green',
                } : {}),
                ...(error ? {
                    backgroundColor: '#C73641',
                } : {}),
                ...(disabled ? {
                    backgroundColor: rgba('#0F0F0F', 0.38),
                } : {}),
            }}
        />
    )
}

interface Props {
    focused: boolean
    error: boolean
    disabled: boolean
}
