import { StyleSheet, Platform, View } from "react-native";
import Constants from 'expo-constants';

// STYLES
import colors from "../styles/Colors";
const offset = 8;

export default function IosStatusCover({ color }: { color?: string }) {
    if (Platform.OS === 'ios') {
        return (
            <View style={[
                styles.iosStatusCover, 
                { backgroundColor: color ? color : colors.red }
            ]}/>
        );
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    iosStatusCover: {
        width: '100%',
        height: Constants.statusBarHeight+offset,
        backgroundColor: colors.red,
        position: 'absolute',
        transform: [
            { translateY: -Constants.statusBarHeight-offset }
        ],
        zIndex: -1,
    }
})