import React from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import { colors } from "../assets/colors";


const Nutriments = ({ nutriData, levels }) => {
  const deviceWidth = Dimensions.get('window').width - 40;
  const amountOfCarbs = nutriData.carbohydrates_100g ? nutriData.carbohydrates_100g : null;
  const amountOfProtein = nutriData.proteins_100g ? nutriData.proteins_100g : null;
  const amountOfFat = nutriData.fat_100g ? nutriData.fat_100g : null;
  const nutriSum = amountOfCarbs + amountOfProtein + amountOfFat;

  const nutriLevels = ['salt', 'sugars', 'fat', 'saturated-fat'];
  const nutriLevelsImg = {
    'sugars': require('../assets/images/sugars.png'),
    'fat': require('../assets/images/fat.png'),
    'salt': require('../assets/images/salt.png'),
    'saturated-fat': require('../assets/images/saturated-fat.png'),
  }
  const nutrientLevelsColor = nutrient => {
    switch (nutrient) {
      case "high":
        return colors.nutriRed;
      case "moderate":
        return colors.nutriYellow;
      case "low":
        return colors.nutriGreen;
      default:
        return colors.lightBlue;
    }
  };

  return (
    nutriSum !== 0 ?
    <View
      style={{
        alignSelf: "stretch",
        padding: 20
      }}
    >
      {nutriData.energy && (
        <Text style={styles.headlineStyle}>
          <Text style={{ color: colors.homeBackground }}>
            {nutriData.energy} kJ
          </Text>{" "}
          Nutriments per 100 g
        </Text>
      )}
      <View
        style={{
          flexDirection: "row"
        }}
      >
        {amountOfCarbs && (
          <View
            style={{
              width: (deviceWidth * amountOfCarbs) / 100,
              height: 10,
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
              backgroundColor: colors.nutriCarbs,
              marginRight: 3
            }}
            />
            )}
        {amountOfProtein && (
          <View
          style={{
            width: (deviceWidth * amountOfProtein) / 100,
            height: 10,
            backgroundColor: colors.nutriProtein,
            marginRight: 3
          }}
          />
          )}
        {amountOfFat && (
          <View
          style={{
            width: (deviceWidth * amountOfFat) / 100,
            height: 10,
            backgroundColor: colors.nutriFat,
            marginRight: 3
            }}
          />
        )}
        <View
          style={{
            width:
              (deviceWidth *
                (100 - (amountOfFat + amountOfCarbs + amountOfProtein))) /
              100,
            height: 10,
            backgroundColor: colors.nutriNeutral,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4
          }}
        />
      </View>
      <View style={styles.nutriLegend}>
        {amountOfCarbs && (
          <View style={styles.nutriLegendBox}>
            <View
              style={[
                styles.nutriLegendBoxIndicator,
                { backgroundColor: colors.nutriCarbs }
              ]}
            />
            <Text
              style={[styles.nutriLegendTextStyle, { marginRight: "auto" }]}
            >
              Carbs
            </Text>
            <Text style={styles.nutriLegendTextStyle}>{amountOfCarbs}g</Text>
          </View>
        )}
        {amountOfProtein && (
          <View style={styles.nutriLegendBox}>
            <View
              style={[
                styles.nutriLegendBoxIndicator,
                { backgroundColor: colors.nutriProtein }
              ]}
            />
            <Text
              style={[styles.nutriLegendTextStyle, { marginRight: "auto" }]}
            >
              Protein
            </Text>
            <Text style={styles.nutriLegendTextStyle}>{amountOfProtein}g</Text>
          </View>
        )}
        {amountOfFat && (
          <View style={styles.nutriLegendBox}>
            <View
              style={[
                styles.nutriLegendBoxIndicator,
                { backgroundColor: colors.nutriFat }
              ]}
            />
            <Text
              style={[styles.nutriLegendTextStyle, { marginRight: "auto" }]}
            >
              Fat
            </Text>
            <Text style={styles.nutriLegendTextStyle}>{amountOfFat}g</Text>
          </View>
        )}
      </View>
      {!Object.keys(levels).length ? null : (
        <View>
          <Text style={styles.headlineStyle}>Nutrient Levels</Text>
          <View style={styles.levelsWrapper}>
            {nutriLevels.map(level => {
              const name = level.replace("saturated-", "Sat. ");
              return (
                <View
                  style={[
                    styles.levelWrapper,
                    { backgroundColor: nutrientLevelsColor(levels[level]) }
                  ]}
                  key={name}
                >
                  <View style={styles.levelsImageBg}>
                    <Image
                      source={nutriLevelsImg[level]}
                      style={styles.levelImg}
                    />
                  </View>
                  <Text style={styles.textStyle}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Text>
                  <View style={styles.levelHorLine} />
                  <Text style={styles.textStyle}>{nutriData[level]}g</Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View> : null
  );
};

const styles = {
  headlineStyle: {
    fontSize: 24,
    fontWeight: "500",
    paddingBottom: 25,
    textAlign: "center",
    color: colors.black
  },
  levelsWrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    flexDirection: "row"
  },
  levelWrapper: {
    alignItems: "center",
    padding: 5,
    borderRadius: 33
  },
  levelsImageBg: {
    backgroundColor: colors.white,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  levelImg: {
    width: 30,
    height: 30
  },
  textStyle: {
    color: colors.white,
    marginTop: 7,
    marginBottom: 7,
    fontSize: 14,
    fontWeight: '400'
  },
  levelHorLine: {
    height: 30,
    width: 3,
    backgroundColor: colors.white,
    borderRadius: 2
  },
  nutriLegend: {
    marginTop: 15,
    marginBottom: 15
  },
  nutriLegendBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  nutriLegendBoxIndicator: {
    height: 18,
    width: 18,
    borderRadius: 3,
    marginBottom: 10,
  },
  nutriLegendTextStyle: {
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 10,
    color: colors.black
  }
};

export default Nutriments;