import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from './src/views/HomeScreen';
import Scanner from './src/views/Scanner';
import Product from './src/views/Product';

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Scanner: { screen: Scanner },
  Product: { screen: Product },
});

const App = createAppContainer(MainNavigator);

export default App;
