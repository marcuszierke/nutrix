import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../assets/colors';

const CompanyHeader = ({ brands }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.homeBackground,            
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        display: "flex",
        alignItems: "center"
      }}
    >
      <View
        style={{
          display: "flex",
          height: 5,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.grey,
          width: 50,
          alignSelf: "center",
          borderRadius: 5
        }}
      />
      <Text
        style={{
          fontSize: 24,
          letterSpacing: 1,
          color: colors.white,
          alignSelf: "center",
          paddingTop: 20,
          paddingBottom: 30
        }}
      >
        {brands ? brands : 'No brand found'}
      </Text>
    </View>
  );
};

export default CompanyHeader;