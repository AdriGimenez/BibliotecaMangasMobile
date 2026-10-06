import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomButton from '../components/CustomButton';

import { globalStyles } from '../theme/globalStyles';
import { colors } from '../theme/colors';
import { authStyles } from '../theme/authStyles';
import { editorialStyles } from '../theme/editorialStyles';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import type { User } from '../types/User';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
    const { register } = useAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async() => {
        if (password !== confirmPassword) {
            console.log('Las contraseñas no coinciden');
            return;
        }

        const newUser: User = {
            username,
            email,
            password,
        };

        await register(newUser);

        console.log('Usuario ingresado: ', newUser.username);
        console.log('Email ingresado:', newUser.email);

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
                    <View style={[authStyles.brandContainer, styles.brandContainer]}>
                        <Text style={authStyles.brand}>
                            Biblioteca
                            <Text style={authStyles.brandAccent}>
                                Mangas
                            </Text>
                        </Text>

                        <View style={authStyles.decorativeLine}>
                            <View style={authStyles.line} />

                            <Text style={authStyles.diamond}>
                                ◆
                            </Text>

                            <View style={authStyles.line} />
                        </View>

                        <Text style={[editorialStyles.overline, 
                            authStyles.centeredOverline]}>
                            TU PRÓXIMA HISTORIA EMPIEZA ACÁ
                        </Text>
                    </View>

                    <View style={[authStyles.hero, styles.hero]}>
                        <Text style={editorialStyles.title}>
                            Crear{' '}
                            <Text style={editorialStyles.titleItalic}>
                                cuenta.
                            </Text>
                        </Text>

                        <Text style={[editorialStyles.subtitle,
                                    authStyles.centeredOverline,]}>
                            Empezá a organizar tu colección de mangas.
                        </Text>
                    </View>

                    <View style={authStyles.form}>
                        <Text style={globalStyles.label}>
                            Usuario
                        </Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Ingresa tu usuario"
                            placeholderTextColor={colors.sage}
                            value={username}
                            onChangeText={setUsername}
                        />

                        <Text style={globalStyles.label}>
                            Correo electrónico
                        </Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="correo@ejemplo.com"
                            placeholderTextColor={colors.sage}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Text style={globalStyles.label}>
                            Contraseña
                        </Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Ingresa tu contraseña"
                            placeholderTextColor={colors.sage}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <Text style={globalStyles.label}>
                            Confirmar contraseña
                        </Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Repetí tu contraseña"
                            placeholderTextColor={colors.sage}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />

                        <CustomButton 
                            title="Registrarme" 
                            onPress={handleRegister}
                        />

                        <View style={authStyles.linkContainer}>
                            <Text style={authStyles.linkText}>
                                ¿Ya tenés cuenta?
                            </Text>

                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={authStyles.link}>
                                    Iniciar sesión
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>    
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 90,
        paddingBottom: 28,
    },

    brandContainer: {
        marginBottom: 18,
    },

    hero: {
        marginBottom: 10,
    },

    keyboardContainer: {
        flex: 1,
        backgroundColor: colors.ivory,
    },

    scrollContent: {
        flexGrow: 1,
    },
});