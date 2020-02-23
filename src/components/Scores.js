import React from 'react';
import { Text, View } from 'react-native';
import { colors, nutriColors, novaColors } from "../assets/colors";

const Scores = ({ productData }) => {
  return (
    <View
      style={{
        padding: 20,
        alignSelf: "stretch",
        display: "flex",
        marginTop: 20,
        marginBottom: 30
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          display: "flex"
        }}
      >
        {productData.nutriscore_grade && <View
          style={{
            backgroundColor: nutriColors[productData.nutriscore_grade],
            padding: 20,
            borderRadius: 10
          }}
        >
          <Text
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              textTransform: "uppercase",
              fontSize: 40,
              color: colors.white
            }}
          >
            {productData.nutriscore_grade}
          </Text>
          <Text
            style={{
              color: colors.white,
              fontSize: 14
            }}
          >
            Nutri-Score
          </Text>
        </View>}
        {productData.nova_group && <View
          style={{
            backgroundColor: novaColors[productData.nova_group],
            padding: 20,
            borderRadius: 10
          }}
        >
          <Text
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              textTransform: "uppercase",
              fontSize: 40,
              color: colors.white
            }}
          >
            {productData.nova_group}
          </Text>
          <Text
            style={{
              color: colors.white,
              fontSize: 14
            }}
          >
            Nova-Score
          </Text>
        </View>}
      </View>
    </View>
  );
}

export default Scores;

