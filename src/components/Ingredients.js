import React from "react";
import { View, Text } from "react-native";
import { colors } from '../assets/colors';

const Ingredients = ({ ingredients }) => {
  let unknownCounter = 0;
  ingredients.map(ingredient => ingredient.includes('unknown') ? unknownCounter += 1 : null);

  if (unknownCounter !== ingredients.length) {
    return (
      <View style={styles.ingredientsWrapper}>
        <Text style={styles.headlineStyle}>Ingredients Analysis</Text>
        <View style={styles.itemsWrapper}>
          {ingredients.map(ing => {
            const tag = ing.slice(3).toLowerCase();
            const bgColor = ((tag.includes('palm') && tag.includes('free')) || (tag.includes('veg') && !tag.includes('non'))) ? colors.nutriGreen : colors.nutriRed;
            
            if (!tag.includes('unknown')) {
              return (
                <View style={[styles.tagWrapper, { backgroundColor: bgColor }]} key={tag}>
                  <Text style={styles.tagTextStyle}>{tag}</Text>
                </View>
              );
            }
          })}
        </View>
      </View>
    );
  } else {
    return null;
  }
};

const styles = {
  ingredientsWrapper: {
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
  itemsWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  tagWrapper: {
    padding: 10,
    borderRadius: 20,
    padding: 12,
    margin: 5
  },
  tagTextStyle: {
    color: colors.white,
    fontSize: 14,
  }
};

export default Ingredients;
