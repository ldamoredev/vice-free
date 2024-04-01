import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'

export type StackScreenOptions = NativeStackNavigationOptions | ((props: {
    route: RouteProp<any, keyof any>;
    navigation: any;
}) => NativeStackNavigationOptions)
