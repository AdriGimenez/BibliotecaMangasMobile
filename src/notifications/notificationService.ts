import { Platform } from "react-native";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export async function requestNotificationPermissions() {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('manga-reminders', {
            name: 'Recordatorios de mangas',
            importance: Notifications.AndroidImportance.HIGH,
        });
    }

    const permissions = await Notifications.getPermissionsAsync();

    if (permissions.status !== 'granted') {
        const requestedPermissions = 
            await Notifications.requestPermissionsAsync();

        return requestedPermissions.status === 'granted';
    }

    return true;
}

export async function scheduleMangaReminder(
    titulo: string,
    tomo: number
) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: '📚 Recordatorio de compra',
            body: `No te olvides de buscar ${titulo} tomo ${tomo}.`,
        },

        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 1,
            channelId: 'manga-reminders',
        },
    });
}