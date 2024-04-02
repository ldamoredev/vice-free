import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PanelScreen } from '../screens/private/Panel/PanelScreen'
import { SettingsScreen } from '../screens/private/SettingsScreen'
import { ScreenDefinition } from '../navigation/navigator/ScreenDefinition'
import { ScreenVisibilities } from '../navigation/navigator/ScreenVisibilities'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Feather } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export const TabsLayout: React.FC = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="/main/panel" component={PanelScreen} options={{ title: 'Panel', tabBarIcon:  (props) => <AntDesign name="iconfontdesktop" size={24} color="black" /> }} />
            <Tab.Screen name="/main/settings" component={SettingsScreen} options={{ title: 'Settings', tabBarIcon: (props) => <Feather name="settings" size={24} color="black" /> }} />
        </Tab.Navigator>
    )
}

export const TabLayoutDefinition: ScreenDefinition = {
    path: '/main',
    component: TabsLayout,
    visibility: ScreenVisibilities.Private,
    options: { headerShown: false, gestureEnabled: false },
}
