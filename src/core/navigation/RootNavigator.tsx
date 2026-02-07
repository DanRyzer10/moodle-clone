import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../../screens/auth/login-screen';
import { DashboardScreen } from '../../screens/dashboard/dashboard-screen';
import { ProfileScreen } from '../../screens/profile/ProfileScreen'; 
import SplashScreen from '../../screens/shared/splash-screen';
import { useAuth } from '../../core/app-context';

const Stack = createNativeStackNavigator();

export default function RootNavigator() { 
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                    headerBackTitle: 'Atrás', 
                    headerTintColor: '#135bec'
                }}
            >
                {!user || !user.token ? (
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                ) : (
                    <Stack.Group>
                        <Stack.Screen 
                            name="Dashboard" 
                            component={DashboardScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="Profile" 
                            component={ProfileScreen} 
                            options={{ headerShown: false }} 
                        />
                    </Stack.Group>
                )} 
            </Stack.Navigator>
        </NavigationContainer>
    );
}