import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SocialStoryView from "../SocialStoryView";
import StoryView from "../StoryView";

const SSStack = createStackNavigator(
  {
    SSHome: { screen: SocialStoryView },
    SS: { screen: StoryView }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
      initialRouteName: "CList"
    }
  }
);

const SSApp = createAppContainer(SSStack);

export default class SSNav extends React.Component {
  render() {
    return <SSApp />;
  }
}
