import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { CameraView } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';
import planogram from '../planogram.json';

// COMPONENTS
import IosStatusCover from '../components/IosStatusCover';
import RackComponent from '../components/RackComponent';

// STYLES
import colors from '../styles/Colors';
import { vs, hs, ms } from '../styles/Responsiveness';
import Popup from '../components/Popup';

export default function Qr() {
  const router = useRouter();

  const cameraRef = useRef<any>(null);
  
  const [showRackPopup, setShowRackPopup] = useState(false);
  const [rackPopupData, setRackPopupData] = useState({
    id: '',
    rackConfiguration: [[]]
  });

  const handleQRScanned = (data: string) => {}

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

  return (
    <View style={styles.container}>
      <IosStatusCover/>
      <StatusBar translucent backgroundColor={colors.red} style='light'/>

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

        <Text style={styles.headerTitle}>UBICAR ANAQUEL</Text>
      </View>

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
            Escanea el QR del anaquel para revisar su organización. Asegúrate de que los productos estén en el lugar correcto según el planograma.
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

          <Text style={styles.popupTitle}>ANAQUEL UBICADO</Text>
          <Text style={styles.rackID}>G756-FR</Text>

          <RackComponent data={planogram.data}/>

          <TouchableOpacity
            style={styles.popupButtonContainer}
            onPress={() => {
              setShowRackPopup(false);
              router.push(`/realogram?rackID=${rackPopupData.id}`);
            }}
          >
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
    backgroundColor: colors.red,
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
  qrIndicator: {
    width: hs(250),
    height: hs(250),
    borderWidth: 5,
    borderColor: colors.red,
    borderRadius: 30,
    position: 'absolute',
    top: '45%',
    transform: [
      { translateY: hs(-125) },
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
