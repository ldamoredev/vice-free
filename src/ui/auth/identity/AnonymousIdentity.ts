import { Identity } from './Identity'

export class AnonymousIdentity implements Identity {
    readonly name = 'Anonymous'
    readonly type = this.constructor.name
    readonly isAuthenticated = false

    snapshot() {
        return this
    }
}
