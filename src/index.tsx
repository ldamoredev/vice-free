import { AppShell } from './AppShell'
import { AppScreenDefinition } from './ui/screens/public/AppScreen'
import { TabLayoutDefinition } from './ui/layout/TabsLayout'

const app = new AppShell()
app.addScreen(TabLayoutDefinition)
app.addScreen(AppScreenDefinition)
app.start()
