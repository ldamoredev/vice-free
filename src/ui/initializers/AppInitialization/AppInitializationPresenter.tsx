import { ChangeFunc, PresenterBase } from '@nbottarini/react-presenter'
import { Authenticator } from '../../../services/auth/Authenticator'

export class AppInitializationPresenter extends PresenterBase<AppInitializationVM> {

    constructor(onChange: ChangeFunc, private authenticator: Authenticator) {
        super(onChange)
        this._model = { isLoading: true }
    }

    async start() {
        await this.authenticator.load()
        this.updateModel({ isLoading: false })
    }
}

export interface AppInitializationVM {
    isLoading: boolean
}
