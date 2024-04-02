import { ChangeFunc, PresenterBase } from '@nbottarini/react-presenter'

export class PanelPresenter extends PresenterBase {
    constructor(onChange: ChangeFunc) {
        super(onChange)
    }

    async break() {
        throw new Error('Broke')
    }
}

