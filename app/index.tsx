import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins';

// COMPONENTS
import IosStatusCover from '../components/IosStatusCover';

// STYLES
import colors from '../styles/Colors';
import { hs, vs, ms } from '../styles/Responsiveness';

export default function App() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Poppins_800ExtraBold,
    });

    if (!fontsLoaded) return null;

    const handleLogin = () => {
        router.push('/home');
    };

    return (
        <View style={styles.container}>
            <IosStatusCover color={colors.yellow} />
            <StatusBar translucent backgroundColor={colors.yellow} style='light' />
            <View style={styles.topBar}/>
            <View style={styles.card}>
                <Text style={styles.title}>INICIAR SESIÓN</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Usuario"
                    placeholderTextColor={colors.red}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[styles.input, { flex: 1, marginBottom: 0 }]}
                        placeholder="Contraseña"
                        placeholderTextColor={colors.red}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TouchableOpacity
                        style={styles.showPasswordButton}
                        onPress={() => setShowPassword((prev: boolean) => !prev)}
                    >
                        <Text style={styles.showPasswordText}>{showPassword ? 'Ocultar' : 'Ver'}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomBar} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.red,
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: vs(40),
        backgroundColor: colors.yellow,
        borderBottomWidth: vs(6),
        borderBottomColor: '#FFF2D6',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: vs(40),
        backgroundColor: colors.yellow,
        borderTopWidth: vs(6),
        borderTopColor: '#FFF2D6',
    },
    card: {
        width: '90%',
        backgroundColor: colors.background,
        borderRadius: 15,
        alignItems: 'center',
        paddingVertical: vs(50),
        paddingHorizontal: hs(10),
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        marginTop: vs(150),
        marginBottom: vs(100),
        alignSelf: 'center',
    },
    title: {
        fontSize: ms(30),
        fontFamily: 'Poppins_700Bold',
        color: colors.red,
        textAlign: 'center',
        marginBottom: vs(40),
    },
    input: {
        width: '90%',
        borderRadius: 100,
        paddingVertical: ms(8),
        paddingHorizontal: hs(15),
        fontFamily: 'Poppins_400Regular',
        fontSize: ms(12),
        color: colors.red,
        marginBottom: vs(18),
        borderWidth: 1.5,
        borderColor: colors.red,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginBottom: vs(18),
    },
    showPasswordButton: {
        marginLeft: hs(10),
        paddingVertical: ms(6),
        paddingHorizontal: hs(20),
        borderRadius: 100,
        backgroundColor: colors.red,
    },
    showPasswordText: {
        color: colors.background,
        fontFamily: 'Poppins_600SemiBold',
        fontSize: ms(13),
    },
    button: {
        backgroundColor: colors.yellow,
        borderRadius: 100,
        paddingVertical: ms(10),
        paddingHorizontal: hs(40),
        marginTop: vs(30),
        alignSelf: 'center',
    },
    buttonText: {
        color: colors.background,
        fontSize: ms(15),
        fontFamily: 'Poppins_700Bold',
        textAlign: 'center',
    },
});