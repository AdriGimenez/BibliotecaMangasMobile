import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
import * as Location from 'expo-location';

import { guardarImagenManga } from '../utils/imageStorage';

type Props = NativeStackScreenProps<RootStackParamList, 'AddManga'>;

export default function AddMangaScreen({ navigation }: Props) {
    const [titulo, setTitulo] = useState('');
    const [tomo, setTomo] = useState('');
    const [editorial, setEditorial] = useState('');
    const [imagenUri, setImagenUri] = useState<string | null>(null);
    const [ubicacion, setUbicacion] = useState<{ latitud: number; longitud: number;} | null>(null);

    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    const addManga = useMangaStore((state) => state.addManga);

    // CÁMARA
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
            Alert.alert('Error', 'No se pudo abrir la cámara.');
        }
    };

    // GALERÍA
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
            Alert.alert('Error', 'No se pudo seleccionar la imagen.');
        }
    }

    // UN SOLO MENÚ PARA CÁMARA Y GALERÍA
    const elegirFoto = () => {
        Alert.alert(
            'Seleccionar imagen',
            '¿Cómo querés agregar la imagen del manga?',
            [
                { text: 'Tomar foto', onPress: tomarFoto },
                { text: 'Seleccionar de galería', onPress: seleccionarImagen },
                { text: 'Cancelar', style: 'cancel' },
            ]
        );
    }

    // GPS
    const obtenerUbicacion = async () => {
        try {
            let permiso = await Location.getForegroundPermissionsAsync();

            if (!permiso.granted) {
                permiso = await Location.requestForegroundPermissionsAsync();
            }

            if (!permiso.granted) {
                Alert.alert(
                    'Permiso requerido',
                    'Necesitamos permiso para obtener tu ubicación.'
                );
                return;
            }

            const serviciosActivos = await Location.hasServicesEnabledAsync();

            if (!serviciosActivos) {
                Alert.alert(
                    'Ubicación desactivada',
                    'Activá la ubicación de tu teléfono.'
                );
                return;
            }

            const resultado = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
            });

            setUbicacion({
                latitud: resultado.coords.latitude,
                longitud: resultado.coords.longitude,
            });

            Alert.alert(
                'Ubicación guardada',
                'Se asociará al manga cuando lo guardes.'
            );
        } catch (error) {
            console.error('Error al obtener la ubicación:', error);
            Alert.alert('Error', 'No se pudo obtener la ubicación.');
        }
    };
    
    // GUARDAR MANGA
    const handleSave = async () => {
        const errors = validateMangaInput(titulo, tomo, editorial);

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
                Alert.alert('Error', 'No se pudo guardar la imagen del manga.');
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
            ubicacion: ubicacion ?? undefined,
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
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                >
                <View style={[globalStyles.screen, styles.container]}>

                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backText}>↩ Volver</Text>
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
                    
                    {/* TÍTULO */}
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

                        {/* TOMO Y EDITORIAL */}
                        <View style={styles.fieldsRow}>

                            <View style={styles.tomoField}>
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
                            </View>

                            <View style={styles.editorialField}>
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
                            </View>
                        </View>

                        {/* FOTOGRAFÍA COMPACTA */}
                        <TouchableOpacity
                            style={styles.fotoFila}
                            onPress={elegirFoto}
                            activeOpacity={0.7}
                        >
                            <View style={styles.fotoMiniatura}>
                                {imagenUri ? (
                                    <Image
                                        source={{ uri: imagenUri }}
                                        style={styles.imagenPreview}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <Text style={styles.fotoIcono}>
                                        📷
                                    </Text>
                                )}
                            </View>

                            <View style={styles.fotoInfo}>
                                    <Text style={styles.fotoTitulo}>
                                        Fotografía del manga
                                    </Text>

                                    <Text style={styles.fotoSubtitulo}>
                                        {imagenUri
                                            ? 'Tocá para cambiar la imagen'
                                            : 'Tocá para agregar una imagen'}
                                    </Text>
                            </View>
                        </TouchableOpacity>

                        {/* OPCIONES ADICIONALES */}
                        <TouchableOpacity
                            style={styles.opcionesHeader}
                            onPress={() => 
                                setMostrarOpciones((valor) => !valor)}
                        >
                            <Text style={styles.opcionesHeaderTexto}>
                                ⚙️ Opciones adicionales
                            </Text>

                            <Text style={styles.opcionesFlecha}>
                                {mostrarOpciones ? '▲' : '▼'}
                            </Text>
                        </TouchableOpacity>

                        {mostrarOpciones && (
                            <View style={styles.opcionesContainer}>
                                <TouchableOpacity
                                    style={styles.opcionUbicacion}
                                    onPress={obtenerUbicacion}
                                >
                                    <Text style={styles.opcionTexto}>
                                        📍 {ubicacion
                                            ? 'Ubicación guardada'
                                            : 'Guardar ubicación actual'}
                                    </Text>
                                </TouchableOpacity>
                                
                                {ubicacion && (
                                    <Text style={styles.estadoUbicacion}>
                                        ✓ Ubicación guardada
                                    </Text>
                                )}
                            </View>
                        )}

                        {/* BOTÓN GUARDAR MANGA */}
                        <View style={styles.guardarContainer}>
                            <CustomButton
                                title='Guardar manga'
                                onPress={handleSave}
                            />
                        </View>
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

    // TOMO  Y EDITORIAL EN UNA FILA
    fieldsRow: {
        flexDirection: 'row',
        gap: 12,
    },

    tomoField: {
        flex: 1,
        minWidth: 0,
    },

    editorialField: {
        flex: 2,
        minWidth: 0,
    },

    // FOTOGRAFÍA PEQUEÑA
    fotoFila: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        marginTop: 24,
        padding: 12,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
    },

    fotoMiniatura: {
        width: 70,
        height: 86,
        backgroundColor: colors.white,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },

    imagenPreview: {
        width: '100%',
        height: '100%',
    },

    fotoIcono: {
        width: '100%',
        height: '100%',
        fontSize: 32,
        textAlign: 'center',
        textAlignVertical: 'center',
        includeFontPadding: false,
    },

    fotoInfo: {
        flex: 1,
    },

    fotoTitulo: {
        color: colors.forest,
        fontSize: 15,
        fontWeight: '600',
    },

    fotoSubtitulo: {
        color: colors.sage,
        fontSize: 13,
        marginTop: 6,
    },

    // DESPLEGABLE
    opcionesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        marginTop: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    opcionesHeaderTexto: {
        color: colors.forest,
        fontSize: 16,
        fontWeight: '600',
    },

    opcionesFlecha: {
        color: colors.emerald,
        fontSize: 22,
    },

    opcionesContainer: {
        paddingVertical: 14,
        paddingHorizontal: 12,
    },

    opcionUbicacion: {
        paddingVertical: 10,
    },

    opcionTexto: {
        color: colors.emerald,
        fontSize: 15,
    },

    estadoUbicacion: {
        color: colors.emerald,
        fontSize: 13,
        marginTop: 6,
    },

    guardarContainer: {
        marginTop: 24,
    },
});