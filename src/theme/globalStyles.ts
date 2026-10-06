import { StyleSheet } from "react-native";
import { colors } from './colors';

export const globalStyles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.ivory,
        paddingHorizontal: 24,
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.forest,
    },

    subtitle: {
        fontSize: 16,
        color: colors.sage,
        marginTop: 8,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.forest,
        marginTop: 20,
        marginBottom: 8,
    },

    input: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 16,
        fontSize: 16,
        color: colors.forest,
    },

    card: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 20,
    },
});