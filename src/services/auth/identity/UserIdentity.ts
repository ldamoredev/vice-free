import { Identity } from './Identity'

export class UserIdentity implements Identity {
    readonly name: string
    readonly type = this.constructor.name
    readonly isAuthenticated = true

    constructor(name: string) {
        this.name = name
    }

    snapshot() {
        return { type: this.type, name: this.name }
    }

    static fromSnapshot(snapshot: any) {
        return new UserIdentity(snapshot.name)
    }
}
