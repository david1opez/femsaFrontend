import { Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

// The guidelineBase width & height values correspond to the dimensions of
// an iPhone X, used for calculating the ratio of the actual screen size
// to the guideline base dimensions,
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Use hs for height, marginTop, marginBottom, marginVertical,
// lineHeight, paddingTop, paddingBottom, paddingVertical, likewise.
const hs = (size: number) => (width / guidelineBaseWidth) * size;

// Use vs for width, marginLeft, marginRight, marginHorizontal,
// paddingLeft, paddingRight, paddingHorizontal, likewise.
const vs = (size: number) => (height / guidelineBaseHeight) * size;

// Use ms for fontSize, borderRadius, likewise.
const ms = (size: number, factor = 0.5) => size + (hs(size) - size) * factor;

const navbarHeight = StatusBar.currentHeight && StatusBar.currentHeight*1.2 + StatusBar.currentHeight / 2 + ms(45)

export { hs, vs, ms, navbarHeight };
