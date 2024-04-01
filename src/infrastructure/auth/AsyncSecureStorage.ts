import { SimpleStorage } from '@nbottarini/simplestorage'
import * as SecureStore from 'expo-secure-store'

export class AsyncSecureStorage implements SimpleStorage {
    async get(key: string): Promise<string | null> {
        return await SecureStore.getItemAsync(key)
    }

    async set(key: string, value: string): Promise<void> {
        if (value === null) return SecureStore.deleteItemAsync(key)
        return SecureStore.setItemAsync(key, value)
    }
}
