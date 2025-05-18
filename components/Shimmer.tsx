import React, { useEffect, useRef } from 'react'
import { StyleSheet, Animated, View, Easing, DimensionValue } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

// STYLES
import { hs } from '../styles/Responsiveness';

const ShimmerLoading = ({width, height, shimmerWidth, shimmerHeight, style, delay, duration, verticalOffset}: {
    width?: DimensionValue,
    height: number,
    shimmerWidth?: DimensionValue,
    shimmerHeight?: DimensionValue,
    style?: any,
    delay?: number,
    duration?: number,
    verticalOffset?: number
}) => {
    const translateAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    useEffect(() => {
        let animationWidth = typeof width === 'number'
            ? width * 2
            : hs(750);

        Animated.loop(
            Animated.timing(translateAnim, {
            toValue: { x: animationWidth, y: 0 },
            duration: duration || 1500,
            easing: Easing.quad,
            useNativeDriver: true,
            delay: delay || 0
            })
        ).start();
    }, []);

    return (
        <View style={[
            style && style,
            styles.container,
            {
                width: width || '100%',
                height: height,
            }
        ]}>
            <Animated.View style={
                [
                    styles.gradientContainer,
                    {
                        transform: [
                            ...translateAnim.getTranslateTransform(),
                            {rotate: '30deg'}
                        ],
                        top: verticalOffset || 0
                    }
                ]}>
                <LinearGradient
                    style={[
                        styles.shimmer,
                        {
                            height: shimmerHeight || '100%',
                            width: shimmerWidth || '20%'
                        }
                    ]}
                    colors={['rgba(0,0,0,0)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)', 'rgba(0,0,0,0)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            </Animated.View>
        </View>
    )
}

export default ShimmerLoading;

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        alignItems: 'center'
    },
    gradientContainer: {
        width: '100%',
        height: '200%',
        left: '-150%',
    },
    shimmer: {
        height: '100%',
        opacity: 0.6,
    },
})