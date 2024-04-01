import { createNavigationContainerRef, StackActions } from '@react-navigation/native'
import { ScreenDefinition } from './ScreenDefinition'
import { Navigator } from '../../../services/navigation/Navigator'
import { Route } from '../../../services/navigation/Route'
import { ScreenVisibilities } from './ScreenVisibilities'
import { ScreenTypes } from './ScreenTypes'
import { InitialRouteNames } from './InitialRouteNames'

export class ReactNavigator implements Navigator {
    private _ref = createNavigationContainerRef()
    private screens: ScreenDefinition[] = []
    readonly initialRouteNames: InitialRouteNames

    constructor() {
        this.initialRouteNames = { public: '/home', private: '/main' }
    }

    get ref() {
        return this._ref
    }

    private getInitialScreen(isAuthenticated: boolean) {
        const routeName = isAuthenticated ? this.initialRouteNames.private : this.initialRouteNames.public
        const screen = this.screens.find(s => s.path === routeName)
        if (!screen) {
            throw new Error(`Initial route with name ${routeName} was not registered`)
        }
        return screen
    }

    getScreens(isAuthenticated: boolean) {
        const initialScreen = this.getInitialScreen(isAuthenticated)
        const visibility = isAuthenticated ? ScreenVisibilities.Private : ScreenVisibilities.Anonymous
        const screens = this.screens.filter(r =>
            (r.visibility === visibility || r.visibility === ScreenVisibilities.Public) &&
            r.type === ScreenTypes.Regular &&
            r !== initialScreen
        )
        return [initialScreen, ...screens]
    }

    getModals(isAuthenticated: boolean) {
        const visibility = isAuthenticated ? ScreenVisibilities.Private : ScreenVisibilities.Anonymous
        return this.screens.filter(r =>
            (r.visibility === visibility || r.visibility === ScreenVisibilities.Public) &&
            r.type === ScreenTypes.Modal
        )
    }

    get currentRoute(): Route|null {
        if (!this.ref.isReady()) return null
        const nativeRoute = this.ref.getCurrentRoute()
        if (!nativeRoute) return null
        return new Route(nativeRoute.name, nativeRoute.params)
    }

    navigate(path: string, params: Record<string, any> = {}) {
        if (!this.ref.isReady()) return null
        // @ts-ignore
        this.ref.navigate(path, params)
    }

    replace(path: string, params: Record<string, any> = {}) {
        if (!this.ref.isReady()) return null
        // @ts-ignore
        this.ref.dispatch(StackActions.replace(path, params))
    }

    goBack() {
        if (!this.ref.isReady()) return null
        // @ts-ignore
        this.ref.goBack()
    }

    popToTop() {
        if (!this.ref.isReady()) return null
        // @ts-ignore
        this.ref.dispatch(StackActions.popToTop())
    }

    addScreen(definition: ScreenDefinition) {
        this.screens.push({ visibility: ScreenVisibilities.Public, type: ScreenTypes.Regular, title: '', ...definition })
    }

    addModal(definition: ScreenDefinition) {
        this.screens.push({ visibility: ScreenVisibilities.Public, type: ScreenTypes.Modal, title: '', ...definition })
    }
}
