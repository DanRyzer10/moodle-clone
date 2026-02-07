import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../../screens/auth/login-screen';
import { DashboardScreen } from '../../screens/dashboard/dashboard-screen';
import SplashScreen from '../../screens/shared/splash-screen';
import { AuthProvider, useAuth } from '../context/auth-context';

const Stack = createNativeStackNavigator();

function AppNavigator() {
    const { isSignedIn, isLoading } = useAuth();

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <Stack.Navigator
            screenOptions={{headerBackTitle: 'Atras', headerTintColor: '#007AFF' }}>
            {!isSignedIn ? (
                <Stack.Screen
                    name="AuthStack"
                    component={LoginScreen}
                    options={{headerShown: false}}
                />
            ) : (
                <>
                    <Stack.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: false}} />
                    {/* <Stack.Screen name='Courses' */}
                </>
            )}
        </Stack.Navigator>
    );
}

export default function RootNavigator() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </AuthProvider>
    );
}
