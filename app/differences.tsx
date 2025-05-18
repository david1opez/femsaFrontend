import { useState, useMemo, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter, useLocalSearchParams } from "expo-router";
import Svg, { Path } from "react-native-svg";
import planogram from '../planogram.json'
import images from '../images.json';

// COMPONENTS
import IosStatusCover from "../components/IosStatusCover";
import InteractiveRackComponent from "../components/InteractiveRackComponent";
import Popup from "../components/Popup";

// STYLES
import colors from "../styles/Colors";
import { hs, vs, ms } from "../styles/Responsiveness";

const placeholderImages = [
    'https://images.rappi.com.mx/products/978114258-1620015273626.png?d=100x100&e=webp&q=50',
    'https://images.rappi.com.mx/products/18f8be3a-1300-45bd-9ce5-1f1df39dfb68.png?e=webp&q=80&d=130x130',
    'https://tiermaker.com/images/chart/chart/todas-las-galletas-mexicanas-uwu-586566/975726246-1562080614png.png',
    'https://images.rappi.com.mx/products/126736157970_afohrxazlgag_900784115482_nspcpoatzvwi_859_1.png?e=webp&q=80&d=130x130',
    'https://images.rappi.com.mx/products/815945917539_xcsmghjiidrf_260142362742_zojkosekubpnit_7501041420244_1.png?d=50x50&e=webp&q=10',
    'https://images.rappi.com.mx/products/bd300c36-5714-493e-84d2-48f4b78e1994.png?d=10x10&e=webp&q=10'
]

export default function Differences() {
    const router = useRouter();
    const { rackID } = useLocalSearchParams();

    const [rackData, setRackData] = useState(() => {
        return planogram.data.map((row: any) => {
            return row.map((cell: any) => {
                return {
                    ...cell,
                    wrong: Math.random() < 0.08,
                    corrected: false,
                }
            })
        })
    });

    const [showReportError, setShowReportError] = useState(false);
    const [showErrorReported, setShowErrorReported] = useState(false);

    const [viewProductDetails, setViewProductDetails] = useState(false);

    const [selectedCell, setSelectedCell] = useState<{
        corrected: boolean;
        nombre: string;
        charola: string;
        posicion: string;
        cantidad: string;
        altura: string;
        ancho: string;
        image: string;
        row: number;
        col: number;
    } | null>(null);

    const [reportText, setReportText] = useState('');

    const handleRetry = () => {
        router.push(`/realogram?rackID=${rackID}`);	
    }

    const handleCellSelect = (rowIndex: number, colIndex: number) => {
        const cell = rackData[rowIndex][colIndex];

        if(cell.wrong || cell.corrected) {
            const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
            
            setSelectedCell({
                ...cell,
                corrected: cell.corrected, // always get the latest value
                image: randomImage,
                row: rowIndex,
                col: colIndex,
            });
        }
    }

    const handleClose = () => {
        setSelectedCell(null);
        setViewProductDetails(false);
    }

    const handleCorrect = () => {
        if(selectedCell) {
            setRackData(prevData => {
                const newData = prevData.map((row, rIdx) =>
                    row.map((cell, cIdx) => {
                        if (rIdx === selectedCell.row && cIdx === selectedCell.col) {
                            return { ...cell, corrected: !cell.corrected };
                        }
                        return cell;
                    })
                );
                return newData;
            });
            setSelectedCell(prev => prev ? { ...prev, corrected: !prev.corrected } : null);
        }
    }

    useEffect(() => {
        console.log('Selected cell:', selectedCell);
    }, [selectedCell]);

    return (
        <View style={styles.container}>
            <IosStatusCover color={colors.red}/>
            <StatusBar translucent backgroundColor={colors.yellow} style='light'/>

            <View style={styles.header}>
                <TouchableOpacity style={styles.warnContainer} onPress={() => setShowReportError(true)}>
                    <Svg width={16} height={16} viewBox="0 0 32 32" fill="none">
                        <Path
                            d="M5 27.0006V6.00061"
                            stroke={colors.yellow}
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <Path
                            d="M5 21.0006C13 15.0006 19 27.0006 27 21.0006V6.00061C19 12.0006 13 0.000605464 5 6.00061"
                            stroke={colors.yellow}
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>

                    <Text style={styles.warnText}>
                        Reportar error
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.back()}
                >
                    <Svg width={28} height={28} viewBox="0 0 32 32" fill="none">
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
            </View>
            
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.title}>DISTRIBUCIÓN INCORRECTA</Text>

                <Text style={styles.description}>
                    Aquí puedes ver y corregir las diferencias entre el anaquel y el planograma. ¡Una buena organización facilita el trabajo y mejora la experiencia de compra!
                </Text>

                <InteractiveRackComponent
                    data={rackData}
                    onPress={(row, col) => handleCellSelect(row, col)}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleRetry()}
                >
                    <Text style={styles.buttonText}>Volver a revisar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push('/realogram')}
                >
                    <Text style={styles.returnButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>

            <Popup show={selectedCell !== null}>
                <View style={styles.popup}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => handleClose()}
                >
                    <Svg width={ms(23)} height={ms(23)} viewBox="0 0 22 22" fill="none">
                        <Path
                            d="M17.1875 4.8125L4.8125 17.1875"
                            stroke="#ED1600"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <Path
                            d="M17.1875 17.1875L4.8125 4.8125"
                            stroke="#ED1600"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </TouchableOpacity>

                <View style={styles.popupContentContainer}>
                    <View style={styles.productContainer}>
                        <Image
                            source={{ uri: selectedCell?.corrected ? (selectedCell && images.images[selectedCell.CB]?.url || 'https://sesmastreeservice.com/images/no-image.png') : selectedCell?.image }}
                            style={styles.image}
                            resizeMethod="resize"
                            onLoad={() => {}}
                            onError={() => {}}
                        />
                        <Text style={styles.imageFooter}>Producto en el realograma</Text>
                    </View>

                    {
                        !selectedCell?.corrected ? (
                            <Svg width={41} height={41} viewBox="0 0 41 41" fill="none">
                                <Path
                                    d="M20.5 35.875C28.9914 35.875 35.875 28.9914 35.875 20.5C35.875 12.0086 28.9914 5.125 20.5 5.125C12.0086 5.125 5.125 12.0086 5.125 20.5C5.125 28.9914 12.0086 35.875 20.5 35.875Z"
                                    stroke="#ED1600"
                                    strokeWidth={2.89}
                                    strokeMiterlimit={10}
                                />
                                <Path
                                    d="M25.625 15.375L15.375 25.625"
                                    stroke="#ED1600"
                                    strokeWidth={2.89}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <Path
                                    d="M25.625 25.625L15.375 15.375"
                                    stroke="#ED1600"
                                    strokeWidth={2.89}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </Svg>
                        ) : (
                            <Svg width={41} height={41} viewBox="0 0 41 41" fill="none">
                                <Path
                                    d="M20.5 35.875C28.9914 35.875 35.875 28.9914 35.875 20.5C35.875 12.0086 28.9914 5.125 20.5 5.125C12.0086 5.125 5.125 12.0086 5.125 20.5C5.125 28.9914 12.0086 35.875 20.5 35.875Z"
                                    stroke="#FCB011"
                                    strokeWidth={2.89}
                                    strokeMiterlimit={10}
                                />
                                <Path
                                    d="M12.8125 22.4219C13.8739 22.4219 14.7344 21.5614 14.7344 20.5C14.7344 19.4386 13.8739 18.5781 12.8125 18.5781C11.7511 18.5781 10.8906 19.4386 10.8906 20.5C10.8906 21.5614 11.7511 22.4219 12.8125 22.4219Z"
                                    fill="#FCB011"
                                />
                                <Path
                                    d="M20.5 22.4219C21.5614 22.4219 22.4219 21.5614 22.4219 20.5C22.4219 19.4386 21.5614 18.5781 20.5 18.5781C19.4386 18.5781 18.5781 19.4386 18.5781 20.5C18.5781 21.5614 19.4386 22.4219 20.5 22.4219Z"
                                    fill="#FCB011"
                                />
                                <Path
                                    d="M28.1875 22.4219C29.2489 22.4219 30.1094 21.5614 30.1094 20.5C30.1094 19.4386 29.2489 18.5781 28.1875 18.5781C27.1261 18.5781 26.2656 19.4386 26.2656 20.5C26.2656 21.5614 27.1261 22.4219 28.1875 22.4219Z"
                                    fill="#FCB011"
                                />
                            </Svg>
                        )
                    }

                    <TouchableOpacity
                        style={styles.productContainer}
                        onPress={() => setViewProductDetails(!viewProductDetails)}
                    >
                        <Image
                            source={{ uri: (selectedCell && images.images[selectedCell.CB]?.url) || 'https://sesmastreeservice.com/images/no-image.png' }}
                            style={styles.image}
                            resizeMethod="resize"
                            onLoad={() => {}}
                            onError={() => {}}
                        />
                        <Text style={styles.imageFooter}>Producto en el planograma</Text>

                        <Svg width={15} height={15} viewBox="0 0 15 15" fill="none" style={styles.infoIcon}>
                            <Path
                                d="M7.5 13.125C10.6066 13.125 13.125 10.6066 13.125 7.5C13.125 4.3934 10.6066 1.875 7.5 1.875C4.3934 1.875 1.875 4.3934 1.875 7.5C1.875 10.6066 4.3934 13.125 7.5 13.125Z"
                                stroke="black"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <Path
                                d="M7.03125 7.03125H7.5V10.3125H7.96875"
                                stroke="black"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <Path
                                d="M7.5 5.625C7.88833 5.625 8.20312 5.3102 8.20312 4.92188C8.20312 4.53355 7.88833 4.21875 7.5 4.21875C7.11167 4.21875 6.79688 4.53355 6.79688 4.92188C6.79688 5.3102 7.11167 5.625 7.5 5.625Z"
                                fill="black"
                            />
                        </Svg>

                        {
                            viewProductDetails && (
                                <View style={styles.productDetails}>
                                    <View style={styles.dataContainer}>
                                        <Text style={styles.label}>Nombre:</Text>
                                        <Text style={styles.value}>{selectedCell?.Nombre}</Text>
                                    </View>
                                    <View style={styles.dataContainer}>
                                        <Text style={styles.label}>Charola:</Text>
                                        <Text style={styles.value}>{selectedCell?.Charola}</Text>
                                    </View>
                                    <View style={styles.dataContainer}>
                                        <Text style={styles.label}>Posición:</Text>
                                        <Text style={styles.value}>{selectedCell?.Posicion}</Text>
                                    </View>
                                    <View style={styles.dataContainer}>
                                        <Text style={styles.label}>Cantidad:</Text>
                                        <Text style={styles.value}>2</Text>
                                    </View>
                                    <View style={styles.dataContainer}>
                                        <Text style={styles.label}>Altura:</Text>
                                        <Text style={styles.value}>2</Text>
                                    </View>
                                    <View style={styles.dataContainer}>
                                        <Text style={styles.label}>Ancho:</Text>
                                        <Text style={styles.value}>3</Text>
                                    </View>
                                </View>
                            )
                        }
                    </TouchableOpacity>
                </View>
            
                <TouchableOpacity
                    style={[
                        styles.popupButtonContainer,
                        { backgroundColor: selectedCell?.corrected ? colors.yellow : colors.red }
                    ]}
                    onPress={() => handleCorrect()}
                >
                    <Text style={styles.popupButtonText}>
                        { selectedCell?.corrected ? 'Desmarcar como corregido' : 'Marcar como corregido' }
                    </Text>
                </TouchableOpacity>
                </View>
            </Popup>

            <Popup show={showReportError}>
                <View style={styles.popup}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setShowReportError(false)}
                    >
                        <Svg width={ms(23)} height={ms(23)} viewBox="0 0 22 22" fill="none">
                            <Path
                                d="M17.1875 4.8125L4.8125 17.1875"
                                stroke="#ED1600"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <Path
                                d="M17.1875 17.1875L4.8125 4.8125"
                                stroke="#ED1600"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </TouchableOpacity>
                    <Text style={[styles.title, { fontSize: ms(22), marginBottom: vs(5) }]}>REPORTAR ERROR</Text>
                    <Text style={[styles.description, { marginBottom: vs(10), color: colors.red, fontSize: ms(12) }]}>¿Qué problema encontraste? (opcional)</Text>
                    <View style={{ width: '90%', marginBottom: vs(20) }}>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: colors.red,
                                borderRadius: 7,
                                padding: ms(10),
                                fontFamily: 'Poppins_400Regular',
                                fontSize: ms(13),
                                color: colors.red,
                                minHeight: vs(60),
                            }}
                            placeholder="Describe el problema..."
                            multiline
                            value={reportText}
                            onChangeText={setReportText}
                        />
                    </View>
                    <TouchableOpacity
                        style={[styles.popupButtonContainer, { backgroundColor: colors.red, marginTop: vs(5) }]
                        }
                        onPress={() => {
                            setShowReportError(false);
                            setShowErrorReported(true);
                            setReportText('');
                        }}
                    >
                        <Text style={styles.popupButtonText}>Enviar reporte</Text>
                    </TouchableOpacity>
                </View>
            </Popup>
            <Popup show={showErrorReported}>
                <View style={styles.popup}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setShowErrorReported(false)}
                    >
                        <Svg width={ms(23)} height={ms(23)} viewBox="0 0 22 22" fill="none">
                            <Path
                                d="M17.1875 4.8125L4.8125 17.1875"
                                stroke="#ED1600"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <Path
                                d="M17.1875 17.1875L4.8125 4.8125"
                                stroke="#ED1600"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: colors.yellow, fontSize: ms(22), marginBottom: vs(10) }]}>¡REPORTE ENVIADO!</Text>
                    <Text style={[styles.description, { color: colors.yellow, fontSize: ms(13) }]}>Gracias por ayudarnos a mejorar. Revisaremos tu reporte lo antes posible.</Text>
                    <TouchableOpacity
                        style={[styles.popupButtonContainer, { backgroundColor: colors.yellow, marginTop: vs(5) }]}
                        onPress={() => setShowErrorReported(false)}
                    >
                        <Text style={[styles.popupButtonText, { color: colors.background }]}>Cerrar</Text>
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
        overflow: 'visible'
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: vs(60),
        backgroundColor: colors.red,
        borderBottomWidth: 15,
        borderColor: colors.yellow,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: hs(20),
        marginBottom: vs(50),
    },
    warnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: hs(7),
    },
    warnText: {
        fontSize: ms(13),
        fontFamily: 'Poppins_500Medium',
        color: colors.background,
        textDecorationLine: 'underline',
    },
    title: {
        fontSize: ms(36),
        lineHeight: vs(45),
        fontFamily: 'Poppins_700Bold',
        color: colors.red,
        textAlign: 'center',
        marginBottom: vs(10)
    },
    description: {
        textAlign: 'center',
        fontSize: ms(13),
        paddingHorizontal: hs(30),
        fontFamily: 'Poppins_400Regular',
        color: colors.red,
        marginBottom: vs(25),
    },
    button: {
        backgroundColor: colors.red,
        paddingVertical: ms(8),
        borderRadius: 100,
        marginTop: vs(40),
        marginHorizontal: hs(90),
        marginBottom: vs(10),
    },
    buttonText: {
        color: colors.background,
        fontSize: ms(16),
        lineHeight: vs(21),
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
    },
    returnButtonText: {
        color: colors.red,
        textDecorationLine: 'underline',
        textAlign: 'center',
        marginBottom: vs(70),
        fontSize: ms(14),
        fontFamily: 'Poppins_600SemiBold',
    },
    popup: {
        width: '90%',
        backgroundColor: colors.background,
        borderRadius: 20,
        paddingVertical: vs(40),
        alignItems: 'center',
        marginTop: vs(70),
    },
    closeButton: {
        position: 'absolute',
        top: hs(20),
        right: hs(20)
    },
    popupButtonContainer: {
        backgroundColor: colors.red,
        paddingVertical: ms(10),
        borderRadius: 100,
        marginTop: vs(35),
        paddingHorizontal: hs(40),
    },
    popupButtonText: {
        color: colors.background,
        fontSize: ms(15),
        lineHeight: vs(21),
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
    },
    popupContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: hs(10)
    },
    productContainer: {
        zIndex: 1000000,
    },
    image: {
        width: hs(120),
        height: hs(120),
    },
    imageFooter: {
        maxWidth: hs(100),
        textAlign: 'center',
        color: colors.red,
        fontSize: ms(12),
        fontFamily: 'Poppins_600SemiBold',
    },
    infoIcon: {
        position: 'absolute',
        top: hs(10),
        right: hs(-5),
    },
    productDetails: {
        position: 'absolute',
        top: hs(30),
        right: hs(10),
        backgroundColor: colors.background,
        borderWidth: 2,
        borderColor: colors.red,
        borderRadius: 10,
        width: hs(220),
        padding: hs(15),
    },
    dataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: vs(8),
    },
    label: {
        fontSize: ms(12),
        fontFamily: 'Poppins_600SemiBold',
        marginRight: hs(8),
        color: colors.red,
    },
    value: {
        fontSize: ms(12),
        fontFamily: 'Poppins_400Regular',
        color: colors.red,
        maxWidth: hs(100),
        textAlign: 'right',
    }
});