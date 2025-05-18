import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Platform, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CameraView } from 'expo-camera';
import { useRouter, useLocalSearchParams } from "expo-router";
import Svg, { Path } from 'react-native-svg';

// COMPONENTS
import IosStatusCover from "../components/IosStatusCover";
import Shimmer from "../components/Shimmer";
import Popup from "../components/Popup";

// STYLES
import colors from "../styles/Colors";
import { vs, hs, ms } from "../styles/Responsiveness";

export default function Realogram() {
    const router = useRouter();
    const { rackID } = useLocalSearchParams();

    const cameraRef = useRef<any>(null);

    const [loading, setLoading] = useState(false);

    const [resultsPopup, setResultsPopup] = useState<null | 'correct' | 'incorrect'>(null);

    const handleRackReview = () => {
        setLoading(true);

        setTimeout(() => {
            setResultsPopup(Math.random() < 0.5 ? 'correct' : 'incorrect');
        }, 2000);
    };

    const handlePopupClose = (close?: "close") => {
        if (close === 'close') {
            setLoading(false);
            setResultsPopup(null);
        } else if (resultsPopup === 'correct') {
            setLoading(false);
            setResultsPopup(null);
            router.push(`/home`);
        } else {
            router.push(`/differences?${rackID}`);
        }
    };

    useEffect(() => {
        if(loading) {
            cameraRef.current?.pausePreview();
        } else {
            cameraRef.current?.resumePreview();
        }
    }, [loading]);

    return (
        <View style={styles.container}>
            <IosStatusCover color={colors.yellow}/>
            <StatusBar translucent backgroundColor={colors.yellow} style='light'/>

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.returnButton}
                    onPress={() => router.back()}
                >
                    <Svg width={24} height={24} viewBox="0 0 32 32" fill="none">
                        <Path
                            d="M10 19L4 13L10 7"
                            stroke={colors.background}
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <Path
                            d="M28 25C28 21.8174 26.7357 18.7652 24.4853 16.5147C22.2348 14.2643 19.1826 13 16 13H4"
                            stroke={colors.background}
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>REVISAR REALOGRAMA</Text>
                </View>

            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing='back'
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.description}>
                        Toma una foto del anaquel y compárala con el planograma. Si todo está bien, ¡felicidades! Si hay diferencias, corrígelas para mantener la tienda ordenada.
                    </Text>
                    <View style={styles.qrIndicator}>
                        {
                            loading && resultsPopup === null && <Shimmer
                                width={'100%'}
                                shimmerWidth={'100%'}
                                height={hs(400)}
                                shimmerHeight={hs(700)}
                                verticalOffset={hs(-155)}
                                style={{ borderRadius: 30 }}
                            />
                        }
                    </View>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        activeOpacity={loading ? 1 : 0.5}
                        onPress={() => handleRackReview()}
                    >
                        <Text style={styles.buttonText}>{!loading ? 'Revisar' : 'Cargando...'}</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>

            <Popup
                show={resultsPopup !== null}
            >
                <View style={[
                        styles.resultsPopup,
                        {
                            backgroundColor: resultsPopup === 'correct' ? colors.yellow : colors.red
                        }
                    ]}
                >
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => handlePopupClose("close")}
                    >
                        <Svg width={ms(23)} height={ms(23)} viewBox="0 0 22 22" fill="none">
                        <Path
                            d="M17.1875 4.8125L4.8125 17.1875"
                            stroke={colors.background}
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <Path
                            d="M17.1875 17.1875L4.8125 4.8125"
                            stroke={colors.background}
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        </Svg>
                    </TouchableOpacity>

                    <View style={styles.popupHeader}>
                        <Svg width={41} height={42} viewBox="0 0 41 42" fill="none">
                            <Path
                                d="M27.3073 16.9887L18.0078 25.8655L13.3582 21.4271"
                                stroke="#FCECCF"
                                strokeWidth={2.88604}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <Path
                                d="M20.3328 36.0103C28.7371 36.0103 35.5501 29.1973 35.5501 20.793C35.5501 12.3888 28.7371 5.57574 20.3328 5.57574C11.9285 5.57574 5.11548 12.3888 5.11548 20.793C5.11548 29.1973 11.9285 36.0103 20.3328 36.0103Z"
                                stroke="#FCECCF"
                                strokeWidth={2.88604}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>

                        <Text style={styles.popupTitle}>DISTRIBUCIÓN { resultsPopup == 'incorrect' ? 'IN' : ''}CORRECTA</Text>
                    </View>

                    <Text style={styles.popupDescription}>
                        {resultsPopup === 'correct'
                            ? '¡Bien hecho! El anaquel está organizado según el planograma. Mantén este orden para ayudar a los clientes.'
                            : 'Hay diferencias con el planograma. Corrige la organización para asegurar que los productos estén en su lugar.'}
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.popupButtonContainer,
                            {
                                marginHorizontal: resultsPopup === 'correct' ? hs(70) : hs(35),
                            }
                        ]}
                        onPress={() => handlePopupClose()}
                    >
                        <Text
                            style={[
                                styles.popupButtonText,
                                {
                                    color: resultsPopup === 'correct' ? colors.yellow : colors.red,
                                }
                            ]}
                        >
                            {resultsPopup === 'correct' ? 'Aceptar' : 'Revisar diferencias'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Popup>

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
        justifyContent: 'center',
        backgroundColor: colors.yellow,
        paddingTop: Platform.OS === 'ios' ? hs(18) : hs(27),
        paddingBottom: Platform.OS === 'ios' ? hs(18) : hs(13),
    },
    headerTitle: {
        fontFamily: 'Poppins_700Bold',
        fontSize: ms(27),
        color: colors.background,
        textAlign: 'center',
    },
    returnButton: {
        position: 'absolute',
        right: hs(20),
        top: 0,
    },
    camera: {
        flex: 1,    
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: hs(25),
        paddingVertical: vs(25),
    },
    description: {
        color: colors.white,
        textAlign: 'center',
        fontSize: ms(14),
        fontFamily: 'Poppins_400Regular',
    },
    qrIndicator: {
        width: '100%',
        height: hs(400),
        borderWidth: 5,
        borderColor: colors.yellow,
        borderRadius: 30,
        position: 'absolute',
        top: '45%',
        transform: [
            { translateY: hs(-155) },
        ],
    },
    buttonContainer: {
        backgroundColor: colors.background,
        paddingVertical: ms(10),
        paddingHorizontal: ms(45),
        borderRadius: 100,
        marginTop: 'auto',
        marginBottom: hs(30),
    },
    buttonText: {
        color: colors.yellow,
        fontSize: ms(18),
        lineHeight: ms(22),
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: hs(20),
        right: hs(20)
    },
    resultsPopup: {
        width: '90%',
        paddingVertical: vs(30),
        paddingHorizontal: hs(20),
        borderRadius: 10,
    },
    popupHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: hs(10),
    },
    popupTitle: {
        color: colors.background,
        fontSize: ms(22),
        lineHeight: ms(27),
        fontFamily: 'Poppins_700Bold',
        textAlign: 'center',
        maxWidth: '55%',
        marginRight: hs(15),
    },
    popupButtonContainer: {
        backgroundColor: colors.background,
        textAlign: 'center',
        paddingVertical: ms(8),
        marginHorizontal: hs(70),
        borderRadius: 100,
    },
    popupButtonText: {
        color: colors.yellow,
        fontSize: ms(16),
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
    },
    popupDescription: {
        textAlign: 'center',
        fontFamily: 'Poppins_500Medium',
        fontSize: ms(12),
        lineHeight: ms(15),
        marginVertical: vs(15),
        color: colors.background,
    }
});