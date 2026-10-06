import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const editorialStyles = StyleSheet.create({
    overline: {
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 2,
        color: colors.gold,
    },

    title: {
        fontFamily: 'serif',
        fontSize: 38,
        fontWeight: 'bold',
        color: colors.forest,
        lineHeight: 42,
    },

    titleItalic: {
        fontFamily: 'serif',
        fontSize: 38,
        fontStyle: 'italic',
        fontWeight: 'normal',
        color: colors.emerald,
        lineHeight: 42,
    },

    subtitle:{
        fontSize: 16,
        color: colors.sage,
        lineHeight: 23,
        marginTop: 24,
    },
});