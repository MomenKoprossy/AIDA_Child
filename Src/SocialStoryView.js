import React from "react";
import { StyleSheet, Image } from "react-native";
import {
  Container,
  Button,
  Header,
  Body,
  Title,
  Left,
  Icon,
  Right,
  Content,
  Card,
  CardItem,
  H3
} from "native-base";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";

export default class SocialStoryView extends React.Component {
  state = {
    stories: [
      {
        name: "I Will Brush My Teeth",
        uri: require("../assets/SocialStories/c1.png")
      },
      {
        name: "I will get schwifty",
        uri: require("../assets/SocialStories/c2.png")
      }
    ]
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: "#c23fc4" }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ alignSelf: "center" }}>Social Story</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <ScrollView>
            {(this.state.stories || []).map((Story, index) => (
              <Card key={index}>
                <CardItem
                  button
                  onPress={() =>
                    this.props.navigation.navigate("SS", { i: index })
                  }
                >
                  <H3>
                    {index + 1}. {Story.name}
                  </H3>
                </CardItem>
                <CardItem>
                  <Image
                    style={{
                      height: 214,
                      width: null,
                      flex: 1
                    }}
                    source={Story.uri}
                  />
                </CardItem>
              </Card>
            ))}
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight
  }
});
