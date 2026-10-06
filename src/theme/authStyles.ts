import { StyleSheet } from "react-native";
import { colors } from './colors';
import { withAppBuildGradle } from "expo/config-plugins";

export const authStyles = StyleSheet.create({
    brandContainer: {
        alignItems: 'center',
        marginBottom: 28,
    },

    brand: {
        fontFamily: 'serif',
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.forest,
    },

    brandAccent: {
        color: colors.gold,
    },

    decorativeLine: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 10,
    },

    line: {
        width: 52,
        height: 1,
        backgroundColor: colors.gold,
    },

    diamond: {
        color: colors.gold,
        fontSize: 8,
        marginHorizontal: 8,
    },

    hero: {
        alignItems: 'center',
        marginBottom: 26,
    },

    centeredOverline: {
        textAlign: 'center',
    },

    centeredSubtitle: {
        textAlign: 'center',
        paddingHorizontal: 22,
    },

    form: {
        width: '100%',
    },

    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 26,
    },

    linkText: {
        color: colors.sage,
        fontSize: 14,
    },

    link: {
        color: colors.emerald,
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
    },
});