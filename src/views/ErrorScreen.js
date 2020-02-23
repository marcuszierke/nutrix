import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, Linking } from 'react-native';
import { colors } from '../assets/colors';

const ErrorScreen = ({ navigation, text, signUp }) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.homeBackground }}>
      <View style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Home")}>
          <View style={styles.backButtonStyle}>
            <Image
              source={require("../assets/images/back.png")}
              style={{ width: 20, height: 20 }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.textStyle}>{text}</Text>
        {signUp ? (
          <TouchableWithoutFeedback
            onPress={() => {
              Linking.openURL("https://world.openfoodfacts.org/");
            }}
          >
            <View style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>OpenFoodFacts</Text>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={() => navigation.navigate("Scanner")}>
            <View style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>Scanner</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    width: "100%",
    padding: 20,
    paddingTop: 40,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-start"
  },
  backButtonStyle: {
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  textStyle: {
    fontSize: 16,
    margin: 20,
    textAlign: 'center',
    color: colors.white
  },
  buttonStyle: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: colors.white,
    padding: 10,
    textTransform: 'uppercase',
    borderRadius: 20,
  },
  buttonTextStyle: {
    fontSize: 16,
    color: colors.white
  }
};

export default ErrorScreen;