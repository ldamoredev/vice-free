import { AppShell } from './AppShell'
import { AppScreenDefinition } from './ui/screens/AppScreen'

const app = new AppShell()
app.addScreen(AppScreenDefinition)
app.start()
