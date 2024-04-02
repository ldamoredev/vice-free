import { AppConfig, AppShell } from './AppShell'
import { AppScreenDefinition } from './ui/screens/public/AppScreen'
import { TabLayoutDefinition } from './ui/layout/TabsLayout'
import { Context } from './ui/context/Context'
import { AlertModalDefinition } from './ui/components/modals/AlertModal'
import { InternalErrorModalDefinition } from './ui/components/modals/InternalErrorModal'

const appConfig: AppConfig = {
    onUnhandledError: (e: Error, context: Context) => {
        console.error(e)
        context.navigator.navigate('/modals/internalError')
    },
}

const app = new AppShell(appConfig)
app.addScreen(TabLayoutDefinition)
app.addModal(AlertModalDefinition)
app.addModal(InternalErrorModalDefinition)
app.addScreen(AppScreenDefinition)
app.start()
