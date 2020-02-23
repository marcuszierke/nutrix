import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableWithoutFeedback, ScrollView } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import Scores from '../components/Scores';
import Nutriments from '../components/Nutriments';
import Ingredients from '../components/Ingredients';
import Allergens from '../components/Allergens';
import Additives from '../components/Additives';
import ErrorScreen from '../views/ErrorScreen';
import CompanyHeader from '../components/CompanyHeader';
import { colors, nutriColors, novaColors } from '../assets/colors';

const Product = ({ navigation }) => {
  const [productData, setProductData] = useState(undefined);
  const [productStatus, setProductStatus] = useState(undefined);
  const [productName, setProductName] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { navigate } = navigation;

  // const eanCode = navigation.state.params.eanCode;
  // const eanCode = '1234567891012'; // no data (Status 0)
  // const eanCode = '1111111111'; // random number (Status 0)
  // const eanCode = '9783406727863'; // book (Status 1 but book)
  // const eanCode = '5000426171518'; // after eight
  // const eanCode = '8002270014901'; // san pellegrino
  // const eanCode = "20047238"; // nuts
  const eanCode = '4008400404127'; // nutella
  // const eanCode = '3228024010134'; // camembert
  // const eanCode = '5038862161503';   // innocent
  // const eanCode = '3068320113708'; // evian
  // const eanCode = '4061458104265'; // Weidemlich (allergens length breaks app)
  // const eanCode = '4311501446454'; // lachs filet (wird rot)
  // const eanCode = '4003171059842'; // Hähnchenbrust
  // const eanCode = '4001568200518'; // Vita Malz
  // const eanCode = '4062800008941'; // Sahne - keine Farben für Nutriments
  // const eanCode = '8424372021500'; // Wasser
  // const eanCode = '8429359000004'; // Wasser

  
  const url = `https://world.openfoodfacts.org/api/v0/product/${eanCode}.json`;
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => setProductInfo(data))
      .catch(error => console.log('Error thrown: ', error));
  }, [productStatus])
    
  const productNameValue = () => {
    if (productStatus === 1) {
      setProductName(productData.product_name);
      return;
    } else {
      setProductName(undefined);
      return;
    }
  }
    
  const setProductInfo = (data) => {
    setProductData(data.product);
    setProductStatus(data.status);
    productNameValue();
    setLoading(false);
  };

  const gradientColor = productData => {
    const novaScoreColor = productData.nova_group;
    const nutriScoreColor = productData.nutriscore_grade;

    if (novaScoreColor !== undefined && nutriScoreColor !== undefined) {
      return [
        nutriColors[nutriScoreColor.toLowerCase()],
        novaColors[novaScoreColor]
      ];
    }
    if (novaScoreColor !== undefined && nutriScoreColor === undefined) {
      return [colors.nutriNeutral, novaColors[novaScoreColor]];
    }
    if (novaScoreColor === undefined && nutriScoreColor !== undefined) {
      return [ nutriColors[nutriScoreColor.toLowerCase()], colors.nutriNeutral];
    }
    if (novaScoreColor === undefined && nutriScoreColor === undefined) {
      return [colors.nutriNeutral, colors.nutriNeutral];
    }
  }

  const renderContent = () => (
    <ScrollView
      contentContainerStyle={{
        display: "flex",
        alignItems: "center",
        backgroundColor: colors.white,
        zIndex: 10,
        minHeight: "100%"
      }}
    >
      <Scores productData={productData} />
      {!Object.keys(productData.nutriments).length ? null : <Nutriments
        nutriData={productData.nutriments}
        levels={productData.nutrient_levels}
      />}
      {productData.ingredients_analysis_tags && <Ingredients ingredients={productData.ingredients_analysis_tags} />}
      <Allergens allergens={productData.allergens_tags} />
      <Additives additives={productData.additives_tags} />
    </ScrollView>
  );
  
  const renderHeader = () => (
    <CompanyHeader brands={productData.brands} />
  );

  let productInfo;

  if (!loading && productStatus === 1) {
    if (productName !== undefined) {
      productInfo = (
        <LinearGradient
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            backgroundColor: colors.white
          }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          colors={gradientColor(productData)}
        >
          <View
            style={{
              display: "flex",
              width: "100%",
              marginTop: 20,
              padding: 20,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "flex-start"
            }}
          >
            <TouchableWithoutFeedback onPress={() => navigate("Home")}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start"
                }}
              >
                <Image
                  source={require("../assets/images/back.png")}
                  style={{ width: 20, height: 20 }}
                />
              </View>
            </TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: colors.white,
                width: 200,
                height: 200,
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
                marginBottom: 50,
                overflow: "hidden",
              }}
            >
              <Image
                source={
                  productData.image_url
                    ? { uri: productData.image_url }
                    : require("../assets/images/dog.png")
                }
                style={{
                  width: productData.image_url ? 200 : 100,
                  height: productData.image_url ? 200 : 100,
                  borderRadius: 100,
                  width: 200,
                  height: 200
                }}
              />
            </View>
            <TouchableWithoutFeedback onPress={() => navigate('Scanner')}>
              <Text style={{ color: colors.white, textTransform: 'uppercase', padding: 5, borderWidth: 1, borderColor: colors.white }}>Scan</Text>
            </TouchableWithoutFeedback>
          </View>
          <Text
            style={{
              fontSize: 32,
              color: colors.white,
              letterSpacing: 1,
              fontWeight: "500",
              textAlign: "center",
              margin: 20
            }}
          >
            {productData.product_name}
          </Text>
          <BottomSheet
            snapPoints={[260, 93, "100%"]}
            renderContent={renderContent}
            renderHeader={renderHeader}
          />
        </LinearGradient>
      );
    } else {
      productInfo = (
        <ErrorScreen
          text={'Sure, that what you are holding in your hands is eat- or drinkable? :)'}
          navigation={navigation}
        />
      );
    }
  }

  if (!loading && productStatus === 0) {
    productInfo = (
      <ErrorScreen
        text={
          "Mmmh, looks like we don't have your product in our database - yet! Why don't you add i!? "
        }
        navigation={navigation}
        signUp
      />
    );
  }

 if (loading) {
    productInfo = (
      <View
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ActivityIndicator size="large" color={colors.black} />
      </View>
    );
  }

  return (
    <React.Fragment>
      {productInfo}
    </React.Fragment>
  );
};

Product.navigationOptions = { header: null };

export default Product;