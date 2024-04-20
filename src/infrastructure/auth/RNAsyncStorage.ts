import { SimpleStorage } from '@nbottarini/simplestorage'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class RNAsyncStorage implements SimpleStorage {
    async get(key: string): Promise<string | null> {
        return await AsyncStorage.getItem(key)
    }

    async set(key: string, value: string): Promise<void> {
        return AsyncStorage.setItem(key, value)
    }
}
