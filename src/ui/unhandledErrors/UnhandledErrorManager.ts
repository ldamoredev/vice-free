import { ErrorHandler } from './ErrorHandler'
import { Context } from '../context/Context'
import { UnhandledErrorHandler } from './UnhandledErrorHandler'

export class UnhandledErrorManager {
    private readonly errorHandlers: ErrorHandler[] = []

    constructor(private context: Context, private readonly onUnhandledError?: UnhandledErrorHandler) {}

    add(errorHandler: ErrorHandler) {
        this.errorHandlers.push(errorHandler)
    }

    handle(e: Error) {
        for (const errorHandler of this.errorHandlers) {
            const handled = errorHandler(e, this.context)
            if (handled) return
        }
        this.onUnhandledError?.(e, this.context)
    }
}
