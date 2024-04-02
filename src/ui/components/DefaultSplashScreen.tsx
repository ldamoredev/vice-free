import { View } from 'react-native'
import React from 'react'
import { ProgressIndicator } from './ProgressIndicator'

export const DefaultSplashScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <ProgressIndicator />
        </View>
    )
}
