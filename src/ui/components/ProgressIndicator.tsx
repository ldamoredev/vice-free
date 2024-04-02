import React, { FC } from 'react'
import { ActivityIndicator, StyleProp, View } from 'react-native'
import { styled } from '@nbottarini/react-native-styled'
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'

export const ProgressIndicator: FC<Props> = (props) => {
    return <_View style={props.style}>
        <ActivityIndicator size={props.size ?? 'large'} color="red" />
    </_View>
}

const _View = styled(View, {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
})

interface Props {
    style?: StyleProp<ViewStyle>
    size?: 'small' | 'large';
}
