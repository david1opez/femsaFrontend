import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { StatusBar } from 'expo-status-bar';

// COMPONENTS
import IosStatusCover from '../components/IosStatusCover';

// STYLES
import colors from '../styles/Colors';
import { hs, vs, ms } from '../styles/Responsiveness';

export function Day({ day, active }) {
    return (
        <View style={styles.dayContainer}>
            <View style={[styles.dayCircle, active && styles.activeCircle]}>
                <Svg width={21} height={22} viewBox="0 0 21 22" fill="none">
                    <Path
                        d="M17.4351 6.56543L8.3947 15.6055L3.87448 11.0857"
                        stroke="#FCECCF"
                        strokeWidth={2.8178}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
            </View>

            <Text style={styles.dayText}>{day}</Text>
        </View>
    )
}

export default function Home() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <IosStatusCover color={colors.red}/>
            <StatusBar translucent backgroundColor={colors.yellow} style='light'/>

            <View style={styles.header}>
                <View style={styles.profilePictureContainer}>
                    <Image
                        style={styles.profilePicture}
                        source={{ uri: 'https://cdn.milenio.com/uploads/media/2024/06/08/empleado-que-recibio-a-maluma_134_0_1065_672.jpg' }}
                    />
                </View>

                <View style={styles.headerTextContainer}>
                    <Text style={styles.username}>Mauricio Gonzalez</Text>
                    <Text style={styles.position}>Gerente</Text>
                </View>
            </View>

            <Text style={styles.streakTitle}>Racha de</Text>
            <Text style={styles.streakCount}>3</Text>
            <Text style={styles.streakDays}>Días</Text>

            <Image
                style={styles.mascotImage}
                source={require('../assets/vik.png')}
            />

            <View style={styles.daysContainer}>
                <Day day="Lun" active={true} />
                <Day day="Mar" active={true} />
                <Day day="Mie" active={true} />
                <Day day="Jue" active={false} />
                <Day day="Vie" active={false} />
                <Day day="Sab" active={false} />
                <Day day="Dom" active={false} />
            </View>

            <Text style={styles.streakDescription}>
                ¡Sigue así! Cada día que organizas los anaqueles mejoras la tienda. ¡No rompas la racha!
            </Text>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>UBICAR ANAQUEL</Text>
                <Text style={styles.description}>
                    Escanea el QR de un anaquel y revisa que los productos estén en el lugar correcto según el planograma.
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/qr')}>
                    <Text style={styles.buttonText}>Revisar anaqueles</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        overflow: 'visible',
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: colors.red,
        borderBottomWidth: 10,
        borderColor: colors.yellow,
        alignItems: 'center',
        paddingHorizontal: hs(20),
        paddingBottom: vs(17),
        paddingTop: vs(5),
        justifyContent: 'flex-start',
    },
    profilePictureContainer: {
        width: hs(45),
        height: hs(45),
        borderRadius: hs(22.5),
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: colors.yellow,
        marginRight: hs(12),
    },
    profilePicture: {
        width: '100%',
        height: '100%',
        borderRadius: hs(22.5),
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    username: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: ms(15),
        color: colors.background,
    },
    position: {
        fontFamily: 'Poppins_400Regular',
        fontSize: ms(12),
        color: colors.background,
        opacity: 0.8,
    },
    streakTitle: {
        color: colors.yellow,
        fontFamily: 'Poppins_700Bold',
        fontSize: ms(22),
        textAlign: 'center',
        marginTop: vs(15),
    },
    streakCount: {
        color: colors.red,
        fontFamily: 'Poppins_800ExtraBold',
        fontSize: ms(70),
        lineHeight: ms(85),
        textAlign: 'center',
    },
    streakDays: {
        color: colors.red,
        fontFamily: 'Poppins_700Bold',
        fontSize: ms(18),
        lineHeight: ms(22),
        textAlign: 'center',
        marginTop: vs(-10),
    },
    mascotImage: {
        width: hs(110),
        height: hs(110),
        alignSelf: 'center',
        position: 'absolute',
        top: vs(130),
        right: hs(30),
        zIndex: 2,
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.yellow,
        borderRadius: 0,
        paddingVertical: vs(10),
        paddingHorizontal: hs(10),
        marginTop: vs(20),
        marginBottom: vs(20),
        width: '100%',
    },
    dayContainer: {
        alignItems: 'center',
        width: hs(42),
    },
    dayCircle: {
        width: hs(30),
        height: hs(30),
        borderRadius: hs(14),
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: vs(3),
    },
    activeCircle: {
        backgroundColor: colors.red,
        borderColor: colors.red,
    },
    dayText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: ms(11),
        color: colors.background,
        textAlign: 'center',
    },
    streakDescription: {
        color: colors.red,
        textAlign: 'center',
        fontSize: ms(13),
        fontFamily: 'Poppins_400Regular',
        marginBottom: vs(18),
        paddingHorizontal: hs(30),
    },
    contentContainer: {
        backgroundColor: colors.red,
        borderRadius: 16,
        marginHorizontal: hs(16),
        marginTop: vs(10),
        paddingVertical: vs(35),
        paddingHorizontal: hs(18),
        alignItems: 'center',
    },
    title: {
        fontSize: ms(22),
        fontFamily: 'Poppins_700Bold',
        color: colors.background,
        textAlign: 'center',
        marginBottom: vs(10),
    },
    description: {
        textAlign: 'center',
        fontSize: ms(13),
        fontFamily: 'Poppins_400Regular',
        color: colors.background,
        marginBottom: vs(18),
    },
    button: {
        backgroundColor: colors.background,
        paddingVertical: ms(10),
        borderRadius: 100,
        marginTop: vs(10),
        marginHorizontal: hs(20),
        marginBottom: 0,
        paddingHorizontal: hs(30),
        alignSelf: 'center',
    },
    buttonText: {
        color: colors.red,
        fontSize: ms(15),
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
    },
});