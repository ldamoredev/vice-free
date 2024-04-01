import { ExpoConfig } from 'expo/config'

module.exports = {
    'name': 'vice-free',
    'slug': 'vice-free',
    'version': '1.0.0',
    'orientation': 'portrait',
    'platforms': ['android', 'ios'],
    'icon': './assets/images/icon.png',
    'splash': {
        'image': './assets/images/splash.png',
        'resizeMode': 'contain',
        'backgroundColor': '#313894',
    },
    'assetBundlePatterns': [
        '**/*',
    ],
    'android': {
        'versionCode': 1,
        'adaptiveIcon': {
            'foregroundImage': './assets/images/adaptive-icon.png',
            'backgroundColor': '#313894',
        },
        'package': process.env.ANDROID_APPLICATION_ID ?? 'com.ldamore.vicefree.dev',
    },
    'ios': {
        'buildNumber': '1',
        'bundleIdentifier': process.env.IOS_BUNDLE_IDENTIFIER ?? 'com.ldamore.vicefree.dev',
    },
    'plugins': [
        [
            'expo-build-properties',
            {
                'android': {
                    'buildToolsVersion': '34.0.0',
                    'compileSdkVersion': 34,
                    'targetSdkVersion': 34,
                    'minSdkVersion': 23,
                    'kotlinVersion': '1.9.0',
                },
            },
        ],
        [
            'expo-font',
            {
                'fonts': [
                    './assets/fonts/MaterialSymbols.ttf',
                    './assets/fonts/Roboto-Black.ttf',
                    './assets/fonts/Roboto-BlackItalic.ttf',
                    './assets/fonts/Roboto-Bold.ttf',
                    './assets/fonts/Roboto-BoldItalic.ttf',
                    './assets/fonts/Roboto-Italic.ttf',
                    './assets/fonts/Roboto-Light.ttf',
                    './assets/fonts/Roboto-LightItalic.ttf',
                    './assets/fonts/Roboto-Medium.ttf',
                    './assets/fonts/Roboto-MediumItalic.ttf',
                    './assets/fonts/Roboto-Regular.ttf',
                    './assets/fonts/Roboto-Thin.ttf',
                    './assets/fonts/Roboto-ThinItalic.ttf',
                ],
            },
        ],
    ],
} satisfies ExpoConfig
