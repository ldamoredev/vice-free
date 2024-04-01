import { Route } from './Route'

export interface Navigator {
    get currentRoute(): Route|null
    navigate(path: string, params?: Record<string, any>): void
    replace(path: string, params?: Record<string, any>): void
    goBack(): void
    popToTop(): void
}
