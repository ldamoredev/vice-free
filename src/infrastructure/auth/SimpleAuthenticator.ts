import { Observable } from '@nbottarini/observable'
import { Authenticator } from '../../ui/auth/Authenticator'
import { Identity } from '../../ui/auth/identity/Identity'
import { AnonymousIdentity } from '../../ui/auth/identity/AnonymousIdentity'
import { AuthStorage } from './AuthStorage'
import { UserIdentity } from '../../ui/auth/identity/UserIdentity'

export class SimpleAuthenticator implements Authenticator {
    readonly changed = new Observable<Identity>()
    private _isLoaded = false
    private _identity: Identity = new AnonymousIdentity()

    constructor(private authStorage: AuthStorage) {
    }

    get identity(): Identity {
        return this._identity
    }

    get isLoaded(): boolean {
        return this._isLoaded
    }

    async load(): Promise<void> {
        this._identity = await this.authStorage.get() ?? new AnonymousIdentity()
        this._isLoaded = true
    }

    async login(name: string): Promise<void> {
        this.failIfNotLoaded()
        await this.updateIdentity(new UserIdentity(name))
    }

    async logout(): Promise<void> {
        this.failIfNotLoaded()
        await this.updateIdentity(new AnonymousIdentity())
    }

    private async updateIdentity(newIdentity: Identity) {
        this._identity = newIdentity
        await this.authStorage.update(newIdentity)
        this.changed.notify(newIdentity)
    }

    private failIfNotLoaded() {
        if (!this.isLoaded) throw new Error('Authenticator not loaded. Must call load first')
    }
}
