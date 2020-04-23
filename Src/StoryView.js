import React from "react";
import Constants from "expo-constants";
import Gallery from "react-native-image-gallery";

const img = [
  [
    {
      source: require("../assets/SocialStories/c11.png"),
      dimensions: { width: 150, height: 150 }
    },
    {
      source: require("../assets/SocialStories/c12.png"),
      dimensions: { width: 150, height: 150 }
    },
    {
      source: require("../assets/SocialStories/c13.png"),
      dimensions: { width: 150, height: 150 }
    },
    {
      source: require("../assets/SocialStories/c14.png"),
      dimensions: { width: 150, height: 150 }
    },
    {
      source: require("../assets/SocialStories/c15.png"),
      dimensions: { width: 150, height: 150 }
    },
    {
      source: require("../assets/SocialStories/c16.png"),
      dimensions: { width: 150, height: 150 }
    },
    {
      source: require("../assets/SocialStories/c17.png"),
      dimensions: { width: 150, height: 150 }
    },
    {
      source: require("../assets/SocialStories/c18.png"),
      dimensions: { width: 150, height: 150 }
    },
    {
      source: require("../assets/SocialStories/c19.png"),
      dimensions: { width: 150, height: 150 }
    },
    {
      source: require("../assets/SocialStories/c110.png"),
      dimensions: { width: 150, height: 150 }
    },
    {
      source: require("../assets/SocialStories/c111.png"),
      dimensions: { width: 150, height: 150 }
    }
  ],
  [
    {
      source: require("../assets/SocialStories/c21.png"),
      dimensions: { width: 150, height: 150 }
    },
    {
      source: require("../assets/SocialStories/c22.png"),
      dimensions: { width: 150, height: 150 }
    },
    {
      source: require("../assets/SocialStories/c23.png"),
      dimensions: { width: 150, height: 150 }
    },
    {
      source: require("../assets/SocialStories/c24.png"),
      dimensions: { width: 150, height: 150 }
    },
    {
      source: require("../assets/SocialStories/c25.png"),
      dimensions: { width: 150, height: 150 }
    },
    {
      source: require("../assets/SocialStories/c26.png"),
      dimensions: { width: 150, height: 150 }
    },
    {
      source: require("../assets/SocialStories/c27.png"),
      dimensions: { width: 150, height: 150 }
    }
  ]
];

export default class StoryView extends React.Component {
  render() {
    return (
      <Gallery
        style={{ flex: 1, backgroundColor: "black" }}
        images={img[this.props.navigation.state.params.i]}
      />
    );
  }
}
