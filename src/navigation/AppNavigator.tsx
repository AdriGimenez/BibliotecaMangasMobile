import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AddMangaScreen from '../screens/AddMangaScreen';

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    AddManga: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator 
                    size="large" 
                    color={colors.emerald}
                />
            </View>
        );
    }

    return (
        <NavigationContainer>   
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {isAuthenticated ? (
                    <>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                        />

                        <Stack.Screen
                            name="AddManga"
                            component={AddMangaScreen}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen 
                            name="Login" 
                            component={LoginScreen} 
                        />

                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: colors.ivory,
        alignItems: 'center',
        justifyContent: 'center',
    },
});