export interface Identity {
    readonly name: string
    readonly type: string
    readonly isAuthenticated: boolean
    snapshot(): any
}
