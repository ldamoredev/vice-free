import { Observable } from '@nbottarini/observable'
import { Authenticator } from '../../services/auth/Authenticator'
import { Identity } from '../../services/auth/identity/Identity'
import { AnonymousIdentity } from '../../services/auth/identity/AnonymousIdentity'
import { AuthStorage } from './AuthStorage'
import { UserIdentity } from '../../services/auth/identity/UserIdentity'

export class SimpleAuthenticator implements Authenticator {
    readonly changed = new Observable<Identity>()
    isLoaded = false
    private _identity: Identity = new AnonymousIdentity()

    constructor(private authStorage: AuthStorage) {
    }

    get identity(): Identity {
        return this._identity
    }

    async login(name: string): Promise<void> {
        await this.updateIdentity(new UserIdentity(name))
    }

    async logout(): Promise<void> {
        await this.updateIdentity(new AnonymousIdentity())
    }

    private async updateIdentity(newIdentity: Identity) {
        this._identity = newIdentity
        await this.authStorage.update(newIdentity)
        this.changed.notify(newIdentity)
    }
}
