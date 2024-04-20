import { ReactNavigator } from '../navigation/navigator/ReactNavigator'
import { Authenticator } from '../auth/Authenticator'

export interface Context {
    authenticator: Authenticator
    navigator: ReactNavigator
    onUnhandledError: (error: Error) => void
}
