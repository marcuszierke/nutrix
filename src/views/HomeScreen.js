import React, { useEffect } from 'react';
import { View, TouchableWithoutFeedback, Image, ImageBackground, StatusBar, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { colors } from '../assets/colors';


const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  const { navigate } = navigation;

  return (
    <View
    style={styles.wrapper}
    >
      {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
      <ImageBackground
        source={require("../assets/images/whiteBackground.png")}
        style={styles.waveImgStyle}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: "75%", resizeMode: "contain", marginBottom: 20 }}
        />
      </ImageBackground>
      <TouchableWithoutFeedback onPress={() => navigate("Product")}>
        <View
          style={styles.iconBackgroundStyle}
        >
          <Image
            source={require("../assets/images/scanIcon.png")}
            style={{
              width: 50,
              height: 50
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: colors.homeBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 100
  },
  waveImgStyle: {
    width: "100%",
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  iconBackgroundStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10
  }
};

HomeScreen.navigationOptions = { header: null };

export default HomeScreen;
