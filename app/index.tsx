import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CameraView } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';

// FONTS
import { 
  useFonts,
  Poppins_400Regular, 
  Poppins_500Medium, 
  Poppins_600SemiBold, 
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

// COMPONENTS
import IosStatusCover from '../components/IosStatusCover';
import RackComponent from '../components/RackComponent';

// STYLES
import colors from '../styles/Colors';
import { vs, hs, ms } from '../styles/Responsiveness';
import Popup from '../components/Popup';

export default function App() {
  const [showRackPopup, setShowRackPopup] = useState(false);
  const [rackPopupData, setRackPopupData] = useState({
    id: '',
    rackConfiguration: [[]]
  });

  const cameraRef = useRef<any>(null);

  const handleQRScanned = (data: string) => {}

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium, 
    Poppins_600SemiBold, 
    Poppins_700Bold,
  });

  useEffect(() => {
    if(showRackPopup) {
      if(cameraRef.current) {
        cameraRef.current.pausePreview();
      }
    } else {
      if(cameraRef.current) {
        cameraRef.current.resumePreview();
      }
    }
  }, [showRackPopup]);

  if (!fontsLoaded) return null;
  else {
    return (
      <View style={styles.container}>
        <IosStatusCover/>
        <StatusBar translucent backgroundColor={colors.red} style='light'/>

        <Text style={styles.header}>UBICAR GÓNDOLA</Text>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing='back'
          barcodeScannerSettings={{
            barcodeTypes: ['qr']
          }}
          onBarcodeScanned={({data}) => handleQRScanned(data)}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Etiam varius tempor dictum. Duis facilisis tellus quam
            </Text>
            <View style={styles.qrIndicator}/>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => setShowRackPopup(true)}
            >
              <Text style={styles.buttonText}>Escanear QR</Text>
            </TouchableOpacity>
          </View>
        </CameraView>

        <Popup show={showRackPopup}>
          <View style={styles.popup}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowRackPopup(false)}
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

            <Text style={styles.popupTitle}>GÓNDOLA UBICADA</Text>
            <Text style={styles.rackID}>G756-FR</Text>

            <RackComponent data={[]}/>

            <TouchableOpacity style={styles.popupButtonContainer}>
              <Text style={styles.popupButtonText}>Revisar realograma</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowRackPopup(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Popup>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'visible',
  },
  header: {
    color: "#fff",
    backgroundColor: colors.red,
    textAlign: 'center',
    fontSize: ms(27),
    paddingVertical: hs(18),
    fontFamily: 'Poppins_700Bold',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: hs(25),
    paddingVertical: vs(25),
  },
  camera: {
    flex: 1,    
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrIndicator: {
    width: 250,
    height: 250,
    borderWidth: 5,
    borderColor: colors.red,
    borderRadius: 30,
    position: 'absolute',
    top: '45%',
    transform: [
      { translateY: -125 },
    ],
  },
  description: {
    color: colors.white,
    textAlign: 'center',
    fontSize: ms(14),
    fontFamily: 'Poppins_400Regular',
  },
  buttonContainer: {
    backgroundColor: colors.background,
    paddingVertical: ms(10),
    paddingHorizontal: ms(45),
    borderRadius: 100,
    marginTop: 'auto',
    marginBottom: hs(90),
  },
  buttonText: {
    color: colors.red,
    fontSize: ms(18),
    fontFamily: 'Poppins_600SemiBold',
  },
  popup: {
    width: '90%',
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingVertical: vs(40),
  },
  closeButton: {
    position: 'absolute',
    top: hs(20),
    right: hs(20)
  },
  popupTitle: {
    color: colors.red,
    fontSize: ms(24),
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    marginBottom: vs(20),
  },
  rackID: {
    backgroundColor: colors.yellow,
    textAlign: 'center',
    fontSize: ms(16),
    color: colors.white,
    fontFamily: 'Poppins_600SemiBold',
    paddingVertical: vs(6),
    marginBottom: vs(20),
  },
  popupButtonContainer: {
    backgroundColor: colors.red,
    paddingVertical: ms(10),
    borderRadius: 100,
    marginHorizontal: hs(60),
    marginBottom: vs(15),
    marginTop: vs(35),
  },
  popupButtonText: {
    color: colors.background,
    fontSize: ms(15),
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
  },
  cancelButtonText: {
    textAlign: 'center',
    color: colors.red,
    fontSize: ms(15),
    fontFamily: 'Poppins_600SemiBold',
    textDecorationLine: 'underline',
  }
})
