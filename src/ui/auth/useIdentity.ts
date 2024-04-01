import { useAppContext } from '../context/AppContext'
import { useObservable } from '@nbottarini/react-observable'

export const useIdentity = () => {
    const { authenticator } = useAppContext()
    return useObservable(authenticator.changed, authenticator.identity)
}
