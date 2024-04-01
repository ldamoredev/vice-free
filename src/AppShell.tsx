import { RootView } from './ui/RootView'
import React from 'react'
import { registerRootComponent } from 'expo'
import { ScreenDefinition } from './ui/navigation/navigator/ScreenDefinition'
import { ReactNavigator } from './ui/navigation/navigator/ReactNavigator'
import { Context } from './ui/context/Context'

export class AppShell {
    public readonly context: Context

    constructor() {
        this.context = this.createContext()
    }

    private createContext(): Context {
        return {
            navigator: new ReactNavigator(),
        }
    }

    private rootComponent = () => {
        return <RootView context={this.context} />
    }

    addScreen(definition: ScreenDefinition) {
        this.context.navigator.addScreen(definition as ScreenDefinition)
    }

    addModal(definition: ScreenDefinition) {
        this.context.navigator.addModal(definition)
    }

    start() {
        const RootComponent = () => <>{this.rootComponent()}</>
        registerRootComponent(RootComponent)
    }
}
