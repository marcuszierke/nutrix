import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { RNCamera } from "react-native-camera";
import BarcodeMask from "react-native-barcode-mask";
import { colors } from "../assets/colors";

export default class Scanner extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        // flashMode: RNCamera.Constants.FlashMode.auto,
        barcodeFinderVisible: true,
        loading: true
      }
    };
  }

  onBarCodeRead(scanResult) {
    if (!this.isBarcodeRead) {
      this.isBarcodeRead = true;
      const eanCode = scanResult.data;
      this.props.navigation.navigate("Product", { eanCode, navigation: this.props.navigation });
    }
    return;
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "lightgreen",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Waiting</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          captureAudio={false}
          barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
          barcodeFinderWidth={250}
          barcodeFinderHeight={350}
          barcodeFinderBorderColor="white"
          barcodeFinderBorderWidth={2}
          defaultTouchToFocus
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          style={styles.preview}
          type={this.state.camera.type}
        >
          <BarcodeMask
            width={200}
            height={300}
            showAnimatedLine={false}
            transparency={0.8}
          />
        </RNCamera>

        <View style={[styles.overlay, styles.topOverlay]}>
          <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Home")}
          style={styles.buttonStyle}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonStyleTextStyle}>BACK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  overlay: {
    position: "absolute",
    padding: 16,
    right: 0,
    left: 0,
    alignItems: "center"
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bottomOverlay: {
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  scanScreenMessage: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  buttonStyle: {
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.homeBackground,
  },
  buttonStyleTextStyle: {
    color: colors.white,
    letterSpacing: 1,
    fontSize: 18,
    fontWeight: '700'
  }
};

Scanner.navigationOptions = { header: null };
