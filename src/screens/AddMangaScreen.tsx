import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useMangaStore } from '../store/mangaStore';
import CustomButton from '../components/CustomButton';
import { scheduleMangaReminder } from '../notifications/notificationService';

import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';
import { editorialStyles } from '../theme/editorialStyles';

import { validateMangaInput } from '../utils/validators';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import type { Manga } from '../types/Manga';

import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

import { guardarImagenManga } from '../utils/imageStorage';

type Props = NativeStackScreenProps<RootStackParamList, 'AddManga'>;

export default function AddMangaScreen({ navigation }: Props) {
    const [titulo, setTitulo] = useState('');
    const [tomo, setTomo] = useState('');
    const [editorial, setEditorial] = useState('');
    const [imagenUri, setImagenUri] = useState<string | null>(null);

    const addManga = useMangaStore((state) => state.addManga);

    const tomarFoto = async () => {
        try {
            const permiso = await ImagePicker.requestCameraPermissionsAsync();

            if (!permiso.granted) {
                Alert.alert(
                    'Permiso requerido',
                    'Necesitamos acceso a la cámara para tomar fotos del manga.'
                );
                return;
            }

            const resultado = await ImagePicker.launchCameraAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 0.8,
            });

            if (!resultado.canceled) {
                setImagenUri(resultado.assets[0].uri);
            }
        } catch (error) {
            console.error('Error al abrir la cámara:', error);
            Alert.alert(
                'Error',
                'No se pudo abrir la cámara.'
            );
        }
    };

    const seleccionarImagen = async () => {
        try {
            const resultado = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 0.8,
            });

            if (!resultado.canceled) {
                setImagenUri(resultado.assets[0].uri);
            }
        } catch (error) {
            console.error('Error al abrir la galería:', error);

            Alert.alert(
                'Error',
                'No se pudo seleccionar la imagen.'
            );
        }
    }

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

        let imagenGuardadaUri: string | undefined;

        if (imagenUri) {
            try {
                imagenGuardadaUri = await guardarImagenManga(imagenUri);
            } catch (error) {
                console.error('Error al guardar la imagen:', error);

                Alert.alert(
                    'Error',
                    'No se pudo guardar la imagen del manga.'
                );
                return;
            }
        }
        
        const newManga: Manga = {
            id: Date.now().toString(),
            titulo,
            tomo: Number(tomo),
            editorial,
            comprado: false,
            imagenUri: imagenGuardadaUri,
        };
        
        await addManga(newManga);

        await scheduleMangaReminder(
            newManga.titulo,
            newManga.tomo
        );

        console.log('Manga guardado:', newManga);

        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
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
                            title= "📷 Tomar foto"
                            onPress={tomarFoto}
                        />

                        <CustomButton
                            title= "🖼️ Seleccionar imagen"
                            onPress={seleccionarImagen}
                        />

                        {imagenUri && (
                            <Image
                                source={{ uri: imagenUri }}
                                style={styles.imagenPreview}
                                resizeMode="contain"
                            />
                        )}

                        <CustomButton
                            title='Guardar manga'
                            onPress={handleSave}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
        paddingBottom: 40,
    },

    keyboardContainer: {
        flex: 1,
        backgroundColor: colors.ivory,
    },

    scrollContent: {
        flexGrow: 1,
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

    imagenPreview: {
        width: '100%',
        height: 220,
        borderRadius: 12,
        marginTop: 16,
    },
});