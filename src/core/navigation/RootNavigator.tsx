import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../../screens/auth/login-screen';
import { DashboardScreen } from '../../screens/dashboard/dashboard-screen';
import SplashScreen from '../../screens/shared/splash-screen';
import { getValueFor } from '../utils/secure-store';



const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const [isloading,setIsLoading] = useState(true);
    const [isSignedIn,setIsSignedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await getValueFor('auth_token');
                setIsSignedIn(!!token);
                console.log('Auth Token:', token);

            }finally {
                setIsLoading(false);
            }
        }
        checkAuth();
    }, []);

    if (isloading) {
        return <SplashScreen />;
    }


    return (
        <NavigationContainer>
            <Stack.Navigator 
            screenOptions={{headerBackTitle: 'Atras', headerTintColor: '#007AFF' }}>
                {!isSignedIn ? (
                    <Stack.Screen
                    name="AuthStack"
                    component={LoginScreen}
                    options={{headerShown: false}}
                    >
                    </Stack.Screen>
                ) : (
                    <>
                    <Stack.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: false}}>
                    </Stack.Screen>
                    {/* <Stack.Screen name='Courses' */}
                    </>
                )} 
            </Stack.Navigator>
            
        </NavigationContainer>
    )
}