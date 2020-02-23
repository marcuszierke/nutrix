import React from "react";
import { View, Text } from "react-native";
import { colors } from '../assets/colors';

const Allergens = ({ allergens }) => {
  return (
    <View style={styles.allergensWrapper}>
      <Text style={styles.headlineStyle}>
        <Text style={{ color: colors.homeBackground }}>
          {Object.keys(allergens).length}
        </Text>{" "}
        {Object.keys(allergens).length === 1 ? "Allergen found" : "Allergens found"}
      </Text>
      <View style={styles.allergensListWrapper}>
        {allergens.map(item => (
            <Text style={styles.allergenTextStyle}>{item.slice(3)}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = {
  allergensWrapper: {
    alignSelf: "stretch",
    padding: 20
  },
  headlineStyle: {
    fontSize: 24,
    fontWeight: "500",
    paddingBottom: 25,
    textAlign: "center",
    color: colors.black
  },
  allergensListWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start"
  },
  allergenTextStyle: {
    fontSize: 16,
    padding: 10,
    color: colors.white,
    backgroundColor: colors.homeBackground,
    borderRadius: 20,
    overflow: "hidden",
    padding: 12,
    margin: 5
  }
};

export default Allergens;
