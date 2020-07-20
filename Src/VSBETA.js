import * as React from "react";
import Constants from "expo-constants";
import { Image, RefreshControl } from "react-native";
import {
  Container,
  Header,
  Body,
  Button,
  Title,
  Content,
  Card,
  CardItem,
  Text,
  Left,
  Icon,
  Thumbnail,
  Right,
  H3,
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { serverURL, Theme_color } from "./utils";
import axios from "react-native-axios";
import moment from "moment";
import { Audio } from "expo-av";

var sound = new Audio.Sound();
sound.loadAsync(require("../assets/alarm.mp3"));

export default class VSBeta extends React.Component {
  url = serverURL + "get_all_tasks_for_child_in_timeFrame";
  picurl = serverURL + "get_task_image?reduced=1&task_id=";
  doneurl = serverURL + "finish_task";

  componentDidMount() {
    this.initAll();
    setInterval(() => {
      this.VSLOGIC();
    }, 5000);
  }

  initAll() {
    this.getChildVS();

    setTimeout(() => this.VSLOGIC(), 1000);
  }

  VSLOGIC = () => {
    var temp = this.state.VS;
    var meow = new Date();
    for (var i = 0; i < temp.length; i++) {
      var ree = new Date(temp[i].end_date_time);
      var wry = new Date(temp[i].start_date_time);
      if (meow > ree && temp[i].state != "done" && temp[i].state != "missed") {
        this.updateState(i, "missed");
      }
      if (meow < wry && temp[i].state != "due") this.updateState(i, "due");
      if (
        meow > wry &&
        meow < ree &&
        temp[i].state != "done" &&
        temp[i].state != "next"
      ) {
        this.updateState(i, "next");
      }
      // if (
      //   now.isAfter(temp[i].end_date_time) &&
      //   temp[i].state != "done" &&
      //   temp[i].state != "missed"
      // ) {
      //   this.updateState(i, "missed");
      // }
      // if (now.isBefore(temp[i].start_date_time) && temp[i].state != "due")
      //   this.updateState(i, "due");
      // if (
      //   now.isBetween(temp[i].start_date_time, temp[i].end_date_time) &&
      //   temp[i].state != "done" &&
      //   temp[i].state != "next"
      // ) {
      //   this.updateState(i, "next");
      // }
    }
  };

  getChildVS = () => {
    axios
      .post(this.url)
      .then((req) => {
        if (JSON.stringify(req.data.success) == "false") {
          alert(JSON.stringify(req.data.errors));
          this.setState({ refresh: false });
        } else if (JSON.stringify(req.data.success) == "true") {
          this.setState({ VS: req.data.result, refresh: false });
        }
      })
      .catch((error) => alert(error));
  };

  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }

  rewards = () => {
    var temp = [];
    temp = this.state.VS;
    var rewards = 0;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].state == "done") rewards++;
    }
    return (
      <Text style={{ marginRight: 10, color: "gold" }}>
        {rewards}/{temp.length}
      </Text>
    );
  };

  renderTime = (time) => {
    var temp = new Date(time);
    return `${this.appendLeadingZeroes(
      temp.getHours()
    )}:${this.appendLeadingZeroes(temp.getMinutes())}`;
  };

  renderRepeat = (task) => {
    return (
      <Body>
        <H3>{task.name}</H3>
      </Body>
    );
  };

  updateState = (index, s) => {
    var temp = [];
    temp = this.state.VS;
    temp[index].state = s;
    this.setState({ VS: temp });
    if (s == "next") sound.playAsync();
    if (s == "done") axios.post(this.doneurl, { task_id: temp[index].task_id });
  };

  renderTask = (task, index) => {
    if (task.state == "missed") {
      return (
        <Card
          key={index}
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          <CardItem bordered style={{ backgroundColor: "red" }}>
            <Left>
              <Thumbnail
                square
                source={{ uri: `${this.picurl}${task.task_id}` }}
                style={{ marginRight: 20 }}
              />
              {this.renderRepeat(task)}
            </Left>
            <Right style={{ flexDirection: "column" }}>
              <Text>Start: {this.renderTime(task.start_date_time)}</Text>
              <Text>End: {this.renderTime(task.end_date_time)}</Text>
            </Right>
          </CardItem>
        </Card>
      );
    } else if (task.state == "done") {
      return (
        <Card
          key={index}
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          <CardItem bordered style={{ backgroundColor: "green" }}>
            <Left>
              <Thumbnail
                square
                source={{ uri: `${this.picurl}${task.task_id}` }}
                style={{ marginRight: 20 }}
              />
              {this.renderRepeat(task)}
            </Left>
            <Right>
              <Text>Start: {this.renderTime(task.start_date_time)}</Text>
              <Text>End: {this.renderTime(task.end_date_time)}</Text>
            </Right>
          </CardItem>
        </Card>
      );
    } else if (task.state == "due" || task.state == "TBD") {
      return (
        <Card
          key={index}
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          <CardItem bordered>
            <Left>
              <Thumbnail
                square
                source={{ uri: `${this.picurl}${task.task_id}` }}
                style={{ marginRight: 20 }}
              />
              {this.renderRepeat(task)}
            </Left>
            <Right>
              <Text>Start: {this.renderTime(task.start_date_time)}</Text>
              <Text>End: {this.renderTime(task.end_date_time)}</Text>
            </Right>
          </CardItem>
        </Card>
      );
    } else if (task.state == "next") {
      return (
        <Card
          key={index}
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          <CardItem bordered style={{ backgroundColor: "#371796" }}>
            <Left>
              <Body>
                <H3 style={{ color: "white" }}>{task.name}</H3>
              </Body>
              <Right>
                <Text>Start: {this.renderTime(task.start_date_time)}</Text>
                <Text>End: {this.renderTime(task.end_date_time)}</Text>
              </Right>
            </Left>
          </CardItem>
          <CardItem bordered style={{ backgroundColor: Theme_color }}>
            <Image
              source={{
                uri: `${serverURL}get_task_image?task_id=${task_id}`,
              }}
              style={{ flex: 1, height: 200, width: 200 }}
            />
          </CardItem>
          <CardItem
            justifyContent="center"
            style={{ backgroundColor: "#371796" }}
          >
            <Button
              style={{
                backgroundColor: Theme_color,
                width: "60%",
                justifyContent: "center",
                alignSelf: "center",
              }}
              onPress={() => this.updateState(index, "done")}
            >
              <Icon name="checkmark-circle-outline" />
              <Text>Confrim</Text>
            </Button>
          </CardItem>
        </Card>
      );
    }
  };

  state = {
    VS: [],
    refresh: true,
  };

  render() {
    return (
      <Container style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
        <Header style={{ backgroundColor: Theme_color }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ alignSelf: "center" }}> VS BETA </Title>
          </Body>
          <Right>
            {this.rewards()}
            <Icon name="star" style={{ color: "gold" }} />
          </Right>
        </Header>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => this.getChildVS()}
            />
          }
        >
          <ScrollView>
            {(this.state.VS || []).map((task, index) =>
              this.renderTask(task, index)
            )}
            {/* <Card style={{ marginTop: 15, marginRight: 15, marginLeft: 15 }}>
              <CardItem bordered>
                <Left>
                  <Thumbnail
                    square
                    source={require("../assets/school-bus.png")}
                    style={{ marginRight: 20 }}
                  />
                  <H3>Ride the bus</H3>
                </Left>
                <Right>
                  <H3>7.30</H3>
                </Right>
              </CardItem>
              <CardItem style={{ marginTop: 5 }}>
                <CheckBox checked={true} />
                <Text style={{ marginLeft: 20 }}>Greet the Driver</Text>
              </CardItem>
            </Card>
            <Card style={{ marginTop: 15, marginRight: 15, marginLeft: 15 }}>
              <CardItem bordered>
                <Left>
                  <Thumbnail
                    square
                    source={require("../assets/school-bus.png")}
                    style={{ marginRight: 20 }}
                  />
                  <H3>Ride the bus</H3>
                </Left>
                <Right>
                  <H3>7.30</H3>
                </Right>
              </CardItem>
              <CardItem style={{ marginTop: 5 }}>
                <CheckBox checked={true} />
                <Text style={{ marginLeft: 20 }}>Greet the Driver</Text>
              </CardItem>
            </Card> */}
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
