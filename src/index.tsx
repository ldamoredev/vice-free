import { AppConfig, AppShell } from './AppShell'
import { HomeScreenDefinition } from './ui/screens/public/HomeScreen'
import { TabLayoutDefinition } from './ui/layout/TabsLayout'
import { Context } from './ui/context/Context'
import { AlertModalDefinition } from './ui/components/modals/AlertModal'
import { InternalErrorModalDefinition } from './ui/components/modals/InternalErrorModal'
import { CreateProfileScreenDefinition } from './ui/screens/public/CreateProfile/CreateProfileScreen'

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
app.addScreen(HomeScreenDefinition)
app.addScreen(CreateProfileScreenDefinition)
app.start()
