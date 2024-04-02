// Based on:
// - https://github.com/getsentry/sentry-react-native/blob/main/src/js/integrations/reactnativeerrorhandlers.ts
// - https://github.com/iyegoroff/react-native-promise-rejection-utils/blob/master/index.js
// - https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/promiseRejectionTrackingOptions.js
import { LogBox } from 'react-native'

export class ReactNativePromisePatcher {
    setup(onUnhandledError: (error: Error) => void) {
        this.polyfillPromise(onUnhandledError)
    }

    /**
     * Polyfill the global promise instance with one we can be sure that we can attach the tracking to.
     *
     * In newer RN versions >=0.63, the global promise is not the same reference as the one imported from the promise library.
     * This is due to a version mismatch between promise versions.
     * Originally we tried a solution where we would have you put a package resolution to ensure the promise instances match. However,
     * - Using a package resolution requires you to manually troubleshoot.
     * - The package resolution fix no longer works with 0.67 on iOS Hermes.
     */
    private polyfillPromise(onUnhandledError: (error: Error) => void): void {
        const { polyfillGlobal } = require('react-native/Libraries/Utilities/PolyfillFunctions')

        // Below, we follow the exact way React Native initializes its promise library, and we globally replace it.
        const Promise = require('promise/setimmediate/es6-extensions')

        // As of RN 0.67 only done and finally are used
        require('promise/setimmediate/done')
        require('promise/setimmediate/finally')

        polyfillGlobal('Promise', () => {
            this.attachUnhandledRejectionHandler(onUnhandledError)
            return Promise
        })
    }

    /**
     * Attach the unhandled rejection handler
     */
    private attachUnhandledRejectionHandler(onUnhandledError: (error: Error) => void): void {
        const tracking = require('promise/setimmediate/rejection-tracking')
        tracking.enable({
            allRejections: true,
            onUnhandled: (id: string, rejection = {}) => {
                if (rejection instanceof Error) {
                    try {
                        onUnhandledError(rejection)
                        return
                    } catch (e) {
                        // Continue with default React Native unhandled error behaviour
                    }
                }

                let message: string
                let stack: string|undefined

                const stringValue = Object.prototype.toString.call(rejection)
                if (stringValue === '[object Error]') {
                    message = Error.prototype.toString.call(rejection)
                    const error: Error = rejection as Error
                    stack = error.stack
                } else {
                    try {
                        message = require('pretty-format')(rejection)
                    } catch {
                        message = typeof rejection === 'string' ? rejection : JSON.stringify(rejection)
                    }
                }

                const warning = `Possible unhandled promise rejection (id: ${id}):\n${message ?? ''}`
                if (__DEV__) {
                    const logBox: any = LogBox as any
                    logBox.addLog({
                        level: 'warn',
                        message: { content: warning, substitutions: [] },
                        componentStack: [],
                        stack,
                        category: 'possible_unhandled_promise_rejection',
                    })
                } else {
                    console.warn(warning)
                }
            },
            onHandled: (id: string) => {
                console.warn(
                    `Promise Rejection Handled (id: ${id})\n` +
                    'This means you can ignore any previous messages of the form ' +
                    `"Possible Unhandled Promise Rejection (id: ${id}):"`,
                )
            },
        })
    }
}
