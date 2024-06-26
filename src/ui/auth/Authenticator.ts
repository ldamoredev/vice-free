import { Identity } from './identity/Identity'
import { Observable } from '@nbottarini/observable'

export interface Authenticator {
    readonly changed: Observable<Identity>
    readonly identity: Identity
    readonly isLoaded: boolean

    load(): Promise<void>
    login(name: string): Promise<void>
    logout(): Promise<void>
}
