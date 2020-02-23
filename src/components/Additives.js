import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../assets/colors';

const Additives = ({ additives }) => {
  const additivesCount = Object.keys(additives).length;
  return (
    <View style={styles.additivesWrapper}>
      <Text style={styles.headlineStyle}>
        <Text style={{ color: colors.homeBackground }}>
          {Object.keys(additives).length}
        </Text>{" "}
        {Object.keys(additives).length === 1 ? "Additive found" : "Additives found"}
      </Text>
      {additivesCount > 0 ? 
        <View style={styles.additivesListWrapper}>
          {additives.map(item => (
            <Text style={styles.additiveTextStyle} key={item}>
              {item.slice(3).toUpperCase()}
            </Text>
          ))}
        </View> : null
      }
    </View>
  );
};

const styles = {
  additivesWrapper: {
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
  additivesListWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  additiveTextStyle: {
    fontSize: 16,
    padding: 10,
    color: colors.white,
    backgroundColor: colors.homeBackground,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 12,
    margin: 5,
  }
};

export default Additives;