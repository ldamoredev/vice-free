import { SimpleStorage } from '@nbottarini/simplestorage'
import { Identity } from '../../ui/auth/identity/Identity'
import { AnonymousIdentity } from '../../ui/auth/identity/AnonymousIdentity'
import { UserIdentity } from '../../ui/auth/identity/UserIdentity'

export class AuthStorage {
    private cachedIdentity: Identity|null = null

    constructor(private dataStorage: SimpleStorage, private authKey = 'current_identity') {}

    async update(identity: Identity) {
        await this.dataStorage.set(this.authKey, JSON.stringify({ type: identity.type, data: identity.snapshot() }))
        this.cachedIdentity = identity
    }

    async get(): Promise<Identity|null> {
        if (this.cachedIdentity) return this.cachedIdentity
        const identity = await this.tryGet()
        if (identity == null) { await this.clear() }
        this.cachedIdentity = identity
        return identity
    }

    async clear() {
        await this.dataStorage.set(this.authKey, null)
        this.cachedIdentity = null
    }

    private async tryGet(): Promise<Identity|null> {
        const identityString = await this.dataStorage.get(this.authKey)
        if (identityString === null) return null
        try {
            const serialized = JSON.parse(identityString)
            switch (serialized.type) {
                case AnonymousIdentity.name: return new AnonymousIdentity()
                case UserIdentity.name: return UserIdentity.fromSnapshot(serialized.data)
                default: throw new Error(`Unsupported identity type "${serialized.type}"`)
            }
        } catch (e) {
            return null
        }
    }
}
