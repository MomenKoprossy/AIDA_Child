import React from "react";
import * as Font from "expo-font";
import { AsyncStorage } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { LoadingView } from "./Src/LoadingView";
import { LoginView } from "./Src/LoginView";
import { Icon } from "native-base";
import GetStartedView from "./Src/GetStartedView";
import VSBeta from "./Src/VSBETA";
import SSNav from "./Src/Navigation/SSNav";
import { Theme_color } from "./Src/utils";
import SocialStoryView from "./Src/SocialStoryView";

const SignoutScreen = () => {};
console.disableYellowBox = true;

const AppNav = createBottomTabNavigator(
  {
    VS: {
      screen: VSBeta,
      navigationOptions: {
        tabBarLabel: "Visual Schedule",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="calendar" style={{ color: tintColor }} />
        ),
      },
    },
    SS: {
      screen: SSNav,
      navigationOptions: {
        tabBarLabel: "Social Stories",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="images" style={{ color: tintColor }} />
        ),
      },
    },
    Logout: {
      screen: SignoutScreen,
      navigationOptions: {
        tabBarLabel: "Logout",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="log-out" style={{ color: tintColor }} />
        ),
        tabBarOnPress: async ({ navigation }) => {
          try {
            await AsyncStorage.removeItem("login").then(() =>
              navigation.navigate("Auth")
            );
          } catch (error) {
            console.log(error);
          }
        },
      },
    },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
    tabBarOptions: {
      activeTintColor: Theme_color,
      inactiveTintColor: "grey",
      showIcon: true,
    },
  }
);

const Main = createAppContainer(
  createSwitchNavigator(
    {
      GetStarted: { screen: GetStartedView },
      App: AppNav,
      Auth: { screen: LoginView },
    },
    { initialRouteName: "GetStarted", headerMode: "none" }
  )
);

export default class App extends React.Component {
  state = {
    loading: true,
  };
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <LoadingView />;
    }

    return <Main></Main>;
  }
}
