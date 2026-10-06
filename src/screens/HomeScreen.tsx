import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getMangas, saveMangas } from '../storage/mangaStorage';
import { useAuth } from '../context/AuthContext';

import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';
import { editorialStyles } from '../theme/editorialStyles';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import type { Manga } from '../types/Manga';

import CustomButton from '../components/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    const { user, logout } = useAuth();

    const [mangas, setMangas] = useState<Manga[]>([]);

    useFocusEffect(
        useCallback(() => {
            const loadMangas = async() => {
                const mangasGuardados = await getMangas();
                setMangas(mangasGuardados);
            };

            loadMangas();
        }, [])
    );

    const handleDelete = async (id: string) => {
        const newList = mangas.filter(
            (manga) => manga.id !== id);

        setMangas(newList);

        await saveMangas(newList);
    };

    return (
        <View style={styles.container}>
            <View style={styles.hero}>
                <View style={styles.heroHeader}>
                    <View>
                        <Text style={[editorialStyles.title,
                            styles.greeting,]}>
                            Hola,
                        </Text>

                        <Text style={[editorialStyles.titleItalic,
                            styles.username]}>
                                {user?.username}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={logout}
                    >
                        <Text style={styles.logoutArrow}>↪</Text>
                        <Text style={styles.logoutText}>Salir</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.heroSubtitle}>
                    Tu lista de deseos te espera.
                </Text>
            </View>

            <View style={styles.content}>
                <Text style={[editorialStyles.title,
                    styles.sectionTitle,]}>
                        Mi lista de deseos
                </Text>

                <Text style={[editorialStyles.subtitle,
                    styles.sectionSubtitle]}>
                    Acá vas a guardar los mangas que querés comprar.
                </Text>

                <CustomButton
                    title= "+ Agregar manga"
                    onPress={() => navigation.navigate('AddManga')}
                />

                <FlatList
                    data={mangas}
                    keyExtractor={(item) => item.id}
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            Todavía no agregarte mangas.
                        </Text>
                    }
                    renderItem={({ item }) => (
                        <View style={[globalStyles.card,
                            styles.mangaCard,]}>
                            
                            <View style={styles.cardContent}>
                                <View>
                                    <Text style={styles.mangaTitle}>
                                        {item.titulo}
                                    </Text>

                                    <Text style={styles.mangaInfo}>
                                        Tomo {item.tomo}
                                    </Text>

                                    <Text style={styles.mangaInfo}>
                                        {item.editorial}
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => handleDelete(item.id)}>
                                        <Text style={styles.deleteText}>
                                            ×
                                        </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.ivory,
    },

    hero: {
        backgroundColor: colors.forest,
        paddingHorizontal: 24,
        paddingTop: 70,
        paddingBottom: 30,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },

    heroHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    greeting: {
        color: colors.ivory,
    },

    username: {
        color: colors.gold,
    },

    heroSubtitle: {
        fontSize: 16,
        color: colors.ivory,
        marginTop: 12,
    },

    logoutButton: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: colors.ivory,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoutArrow: {
        color: colors.emerald,
        fontSize: 18,
        lineHeight: 18,
    },

    logoutText: {
        color: colors.emerald,
        fontSize: 14,
        fontWeight: 'bold',
    },

    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 28,
    },

    sectionTitle: {
        fontSize: 30,
        lineHeight: 34,
    },

    sectionSubtitle: {
        marginTop: 6,
    },

    list: {
        marginTop: 20,
    },

    mangaCard: {
        marginBottom: 12,
    },

    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    mangaTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.forest,
    },

    mangaInfo: {
        fontSize: 14,
        color: colors.sage,
        marginTop: 4,
    },

    deleteButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.dangerSoft,
        alignItems: 'center',
        justifyContent: 'center',
    },

    deleteText: {
        color: colors.danger,
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 26,
    },

    emptyText: {
        fontSize: 15,
        color: colors.sage,
        textAlign: 'center',
        marginTop: 30,
    },
});