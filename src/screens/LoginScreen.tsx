import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../context/AuthContext';

import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';
import { authStyles } from '../theme/authStyles';
import { editorialStyles } from '../theme/editorialStyles';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    const { login } = useAuth();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const loginCorrecto = await login(email, password);
        
        if (loginCorrecto) {
            console.log('Login correcto');
        } else {
            console.log('Email o contraseña incorrectos');
        }
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
                        <View style={authStyles.brandContainer}>
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
                
                            <Text style={[editorialStyles.overline, authStyles.centeredOverline]}>
                                TU PRÓXIMA HISTORIA EMPIEZA ACÁ
                            </Text>
                        </View>

                        <View style={authStyles.hero}>
                            <Text style={editorialStyles.title}>
                                Bienvenid@
                            </Text>

                            <Text style={editorialStyles.titleItalic}>
                                de nuevo.
                            </Text>

                            <Text style={[editorialStyles.subtitle, authStyles.centeredSubtitle]}>
                                Iniciá sesión para continuar con tu colección de mangas.
                            </Text>
                        </View>

                        <View style={authStyles.form}>
                            <Text style={globalStyles.label}>
                                Correo electrónico
                            </Text>

                            <TextInput
                                style={globalStyles.input}
                                placeholder="correo@ejemplo.com"
                                placeholderTextColor={colors.sage}
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize='none'
                                keyboardType='email-address'
                            />

                            <Text style={globalStyles.label}>
                                Contraseña
                            </Text>

                            <TextInput
                                style={globalStyles.input}
                                placeholder="Ingresá tu contraseña"
                                placeholderTextColor={colors.sage}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />

                            <CustomButton 
                                title="Iniciar sesión" 
                                onPress={handleLogin}
                            />

                            <View style={authStyles.linkContainer}>
                                <Text style={authStyles.linkText}>
                                    ¿No tenés cuenta?
                                </Text>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('Register')}
                            >
    
                                <Text style={authStyles.link}>
                                    Crear cuenta
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
        paddingBottom: 40,
    },

    keyboardContainer: {
        flex: 1,
        backgroundColor: colors.ivory,
    },

    scrollContent: {
        flexGrow: 1,
    },
});