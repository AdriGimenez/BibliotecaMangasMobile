import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { useEffect } from 'react';
import { requestNotificationPermissions } from './src/notifications/notificationService';

export default function App() {
  useEffect (() => {
    const ConfigureNotifications = async () => {
      const granted = await requestNotificationPermissions();

      console.log('Permiso de notificaciones:', granted);
    };

    ConfigureNotifications();
  }, []);

  return (
   <AuthProvider>
      <AppNavigator />
      <StatusBar style="dark" />
    </AuthProvider>
  );
}
