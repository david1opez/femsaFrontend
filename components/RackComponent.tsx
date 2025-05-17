import { StyleSheet, View, Image } from "react-native";

// STYLES
import colors from "../styles/Colors";
import { hs, vs } from "../styles/Responsiveness";

const placeholderImages = [
    'https://images.rappi.com.mx/products/978114258-1620015273626.png?d=100x100&e=webp&q=50',
    'https://images.rappi.com.mx/products/18f8be3a-1300-45bd-9ce5-1f1df39dfb68.png?e=webp&q=80&d=130x130',
    'https://tiermaker.com/images/chart/chart/todas-las-galletas-mexicanas-uwu-586566/975726246-1562080614png.png',
    'https://images.rappi.com.mx/products/126736157970_afohrxazlgag_900784115482_nspcpoatzvwi_859_1.png?e=webp&q=80&d=130x130',
    'https://images.rappi.com.mx/products/815945917539_xcsmghjiidrf_260142362742_zojkosekubpnit_7501041420244_1.png?d=50x50&e=webp&q=10',
    'https://images.rappi.com.mx/products/bd300c36-5714-493e-84d2-48f4b78e1994.png?d=10x10&e=webp&q=10'

]

export default function RackComponent({data}: { data: any[][] }) {
    if(!data || data.length === 0) {
        data = Array.from({length: Math.floor(Math.random() * 3) + 2}, () => Array.from({length: Math.floor(Math.random() * 7) + 2}, () => ''));
    }

    return (
        <View>
            {
                data.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {
                            row.map((cell, colIndex) => {
                                return (
                                    <View
                                        key={colIndex}
                                        style={[
                                            styles.cell,
                                            {
                                                borderTopWidth: rowIndex === 0 ? 0 : 1,
                                                borderLeftWidth: colIndex === 0 ? 0 : 1,
                                                borderBottomWidth: rowIndex === data.length - 1 ? 0 : 1,
                                                borderRightWidth: colIndex === row.length - 1 ? 0 : 1,
                                            }
                                        ]}
                                    >
                                        <Image
                                            source={{ uri: placeholderImages[Math.floor(Math.random() * placeholderImages.length)] }}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                resizeMode: 'contain',
                                            }}
                                            resizeMethod="resize"
                                            onLoad={() => {}}
                                            onError={() => {}}
                                        />
                                    </View>
                                )
                            })
                        }
                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginHorizontal: hs(20),
    },
    cell: {
        flex: 1,
        height: vs(45),
        borderWidth: 1,
        borderColor: colors.yellow,
    }
});