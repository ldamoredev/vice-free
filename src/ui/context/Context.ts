import { ReactNavigator } from '../navigation/navigator/ReactNavigator'
import { Authenticator } from '../../services/auth/Authenticator'

export interface Context {
    authenticator: Authenticator
    navigator: ReactNavigator
}
