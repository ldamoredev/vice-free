import { RootView } from './ui/RootView'
import React from 'react'
import { registerRootComponent } from 'expo'
import { ScreenDefinition } from './ui/navigation/navigator/ScreenDefinition'
import { ReactNavigator } from './ui/navigation/navigator/ReactNavigator'
import { Context } from './ui/context/Context'
import { SimpleAuthenticator } from './infrastructure/auth/SimpleAuthenticator'
import { AsyncSecureStorage } from './infrastructure/auth/AsyncSecureStorage'
import { AuthStorage } from './infrastructure/auth/AuthStorage'
import { UnhandledErrorManager } from './ui/unhandledErrors/UnhandledErrorManager'
import { UnhandledErrorHandler } from './ui/unhandledErrors/UnhandledErrorHandler'

export class AppShell {
    public readonly context: Context
    private readonly unhandledErrorManager: UnhandledErrorManager

    constructor(private config: AppConfig) {
        this.context = this.createContext()
        this.unhandledErrorManager = new UnhandledErrorManager(this.context, config.onUnhandledError)
    }

    private createContext(): Context {
        return {
            authenticator: new SimpleAuthenticator(new AuthStorage(new AsyncSecureStorage())),
            navigator: new ReactNavigator(),
            onUnhandledError: (e) => this.unhandledErrorManager.handle(e),
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

export interface AppConfig {
    onUnhandledError: UnhandledErrorHandler
}
