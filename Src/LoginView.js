import React from "react";
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Image,
  AsyncStorage,
} from "react-native";
import { Block, Button, Input, Text } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { HeaderHeight, serverURL, Theme_color } from "./utils";
import axios from "react-native-axios";

const { width } = Dimensions.get("window");
url = serverURL + "loginChild";

export class LoginView extends React.Component {
  state = {
    cCode: "",
    active: {
      cCode: false,
    },
  };

  toggleActive = (name) => {
    const { active } = this.state;
    active[name] = !active[name];

    this.setState({ active });
  };
  render() {
    return (
      <LinearGradient
        locations={[0.1, 1]}
        colors={["#ffffff", "#371796"]}
        style={{
          marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
          flex: 1,
          paddingTop: Constants.statusBarHeight,
        }}
      >
        <Block flex middle>
          <KeyboardAvoidingView behavior="padding" enabled>
            <Block middle>
              <Block
                center
                style={{
                  marginTop: 200,
                  shadowColor: "#202020",
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 5,
                }}
              >
                <Image source={require("../assets/logo.png")} />
              </Block>
            </Block>
            <Block flex>
              <Block center>
                <Input
                  borderless
                  color="#333435"
                  placeholder="Child Code"
                  type="number-pad"
                  autoCapitalize="none"
                  bgColor="transparent"
                  onBlur={() => this.toggleActive("cCode")}
                  onFocus={() => this.toggleActive("cCode")}
                  onChangeText={(text) => this.setState({ cCode: text })}
                  style={[
                    styles.input,
                    this.state.active.email ? styles.inputActive : null,
                  ]}
                />
              </Block>
              <Block flex top style={{ marginTop: 20 }}>
                <Button
                  shadowless
                  color={Theme_color}
                  style={{ height: 48 }}
                  onPress={() => this.loginRequest()}
                >
                  Login
                </Button>
              </Block>
            </Block>
          </KeyboardAvoidingView>
        </Block>
      </LinearGradient>
    );
  }

  loginRequest = () => {
    axios
      .post(url, {
        child_code: this.state.cCode,
      })
      .then((req) => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else if (JSON.stringify(req.data.success) == "true") {
          this.saveLogin();
          this.props.navigation.navigate("App");
        }
      })
      .catch((error) => alert(error));
  };

  saveLogin = async () => {
    try {
      await AsyncStorage.setItem("login", this.state.cCode);
    } catch (error) {}
  };

  // getLogin = async () => {
  //   try {
  //     code = await AsyncStorage.getItem("login");
  //     this.setState({ cCode: code });
  //     this.loginRequest();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
}

const styles = StyleSheet.create({
  input: {
    width: width * 0.9,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#727276",
  },
  inputActive: {
    borderBottomColor: "white",
  },
});
