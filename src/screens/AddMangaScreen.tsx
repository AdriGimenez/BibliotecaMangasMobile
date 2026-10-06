import { useState } from 'react';
import { StyleSheet, Text, TextInput,TouchableOpacity, View } from 'react-native';
import { getMangas, saveMangas } from '../storage/mangaStorage';
import CustomButton from '../components/CustomButton';
import { scheduleMangaReminder } from '../notifications/notificationService';

import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';
import { editorialStyles } from '../theme/editorialStyles';

import { validateMangaInput } from '../utils/validators';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import type { Manga } from '../types/Manga';

type Props = NativeStackScreenProps<RootStackParamList, 'AddManga'>;

export default function AddMangaScreen({ navigation }: Props) {
    const [titulo, setTitulo] = useState('');
    const [tomo, setTomo] = useState('');
    const [editorial, setEditorial] = useState('');

    const handleSave = async () => {
        const errors = validateMangaInput(
            titulo,
            tomo,
            editorial
        );

        if (errors.length > 0) {
            console.log('Errores de validación:', errors);
            return;
        }
        
        const newManga: Manga = {
            id: Date.now().toString(),
            titulo,
            tomo: Number(tomo),
            editorial,
            comprado: false,
        };

        const mangasGuardados = await getMangas();

        const newList = [...mangasGuardados, newManga];

        await saveMangas(newList);
        
        await scheduleMangaReminder(
            newManga.titulo,
            newManga.tomo
        );

        console.log('Manga guardado:', newManga);

        navigation.goBack();
    };

    return (
        <View style={[globalStyles.screen, styles.container]}>
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backText}>
                    ↩ Volver
                </Text>
            </TouchableOpacity>

            <View style={styles.hero}>
                <Text style={editorialStyles.title}>
                    Agregar
                </Text>

                <Text style={editorialStyles.titleItalic}>
                    manga.
                </Text>

                <Text style={editorialStyles.subtitle}>
                    Agregá un manga a tu lista de deseos.
                </Text>
            </View>

            <View style={styles.divider} />
            
            <View style={styles.form}>
                <Text style={globalStyles.label}>
                    Título
                </Text>

                <TextInput
                    style={globalStyles.input}
                    placeholder="Ej: Maid-sama"
                    placeholderTextColor={colors.sage}
                    value={titulo}
                    onChangeText={setTitulo}
                />

                <Text style={globalStyles.label}>
                    Tomo
                </Text>

                <TextInput
                    style={globalStyles.input}
                    placeholder="Ej: 1"
                    placeholderTextColor={colors.sage}
                    value={tomo}
                    onChangeText={setTomo}
                    keyboardType="numeric"
                />

                <Text style={globalStyles.label}>
                    Editorial
                </Text>

                <TextInput
                    style={globalStyles.input}
                    placeholder="Ej: Ivrea"
                    placeholderTextColor={colors.sage}
                    value={editorial}
                    onChangeText={setEditorial}
                />

                <CustomButton
                    title='Guardar manga'
                    onPress={handleSave}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
        paddingBottom: 40,
    },

    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 32,
        paddingVertical: 4,
        paddingRight: 8,
    },

    backText: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.emerald,
    },

    hero: {
        marginTop: 12,
        marginBottom: 24,
    },

    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginBottom: 10,
    },

    form: {
        width: '100%',
    },
});