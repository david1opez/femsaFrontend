import { StyleSheet, View } from "react-native";

// STYLES
import colors from "../styles/Colors";
import { hs, vs } from "../styles/Responsiveness";
import Constants from 'expo-constants';
const offset = 8;

export default function Popup({show, children}: {show: boolean, children?: React.ReactNode}) {
    if (!show) return null;

    return (
        <View style={styles.background}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        top: -Constants.statusBarHeight - offset,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    }
});