import React, { ComponentType } from 'react'
import { Theme } from './Theme'
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { styled, styledPressable } from '@nbottarini/react-native-styled'
import { useTheme } from './ThemeContext/ThemeContext'

type Styles = StyleProp<ViewStyle | TextStyle | ImageStyle>
type StylesFunc<P> = (props: P & { [x:string]: any }) => Styles

export function themed<E, P>(
    Component: ComponentType<P>,
    styles: Styles|StylesFunc<E & P & { theme: Theme }>,
): ComponentType<E & P & { [x:string]: any }> {
    const StyledComponent = styled(Component, styles)
    return (props) => {
        const { theme } = useTheme()
        return <StyledComponent {...props} theme={theme} />
    }
}

export function themedPressable<E, P>(
    Component: ComponentType<P>,
    styles: Styles|StylesFunc<E & P & { theme: Theme }>,
    pressedStyles: Styles|StylesFunc<E & P & { theme: Theme }>,
): ComponentType<E & P & { pressed?: boolean, [x:string]: any }> {
    const StyledComponent = styledPressable(Component, styles, pressedStyles)
    return (props) => {
        const { theme } = useTheme()
        return <StyledComponent {...props} theme={theme} />
    }
}
