import React, { useState, Fragment } from "react";
// import { useSelector, useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import LogoIcon from "../assets/bookmark-img.png";

const SignUpScreen = ({ navigation }) => {
  const [fieldInputs, setFieldInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSetFieldInput = (event, field) => {
    let value = event.nativeEvent.text;
    value = value.replace(/[^-A-Za-z ]/gi, "");
    setFieldInputs((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerSection}>
        <Image style={styles.logo} source={LogoIcon} />
        <CustomText style={styles.header} option='thin'>
          Welcome
        </CustomText>
        <CustomText style={styles.subHeader} option='mid'>
          Sign Up to use Vocabular
        </CustomText>
      </View>
      <View style={styles.mainSection}>
        <View style={styles.fieldInput}>
          <Ionicons
            name={"ios-person"}
            size={26}
            style={styles.icon}
            color={Colors.iconLightGray}
          />
          <TextInput
            style={styles.textInput}
            onChange={(event) => handleSetFieldInput(event, "name")}
            placeholder='Name'
            value={fieldInputs.name}
          />
        </View>
        <View style={styles.fieldInput}>
          <Ionicons
            name={"ios-mail"}
            size={26}
            style={styles.icon}
            color={Colors.iconLightGray}
          />
          <TextInput
            style={styles.textInput}
            onChange={(event) => handleSetFieldInput(event, "email")}
            placeholder='Email address'
            value={fieldInputs.email}
          />
        </View>
        <View style={styles.fieldInput}>
          <Ionicons
            name={"ios-lock-closed"}
            size={26}
            style={styles.icon}
            color={Colors.iconLightGray}
          />
          <TextInput
            style={styles.textInput}
            onChange={(event) => handleSetFieldInput(event, "password")}
            placeholder='Password'
            value={fieldInputs.password}
          />
        </View>
        <View style={styles.button}>
          <TouchableOpacity>
            <CustomText option='mid' style={{ color: "#fff" }}>
              Sign Up
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CustomText option='bodyGray'>
            Already have an account with us?
          </CustomText>
          <TouchableOpacity>
            <CustomText option='body' style={styles.signUpOrSignIn}>
              Sign In
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

SignUpScreen.propTypes = {};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    backgroundColor: Colors.background,
  },
  logo: {
    resizeMode: "contain",
    width: 65,
    height: 65,
    marginBottom: 22,
  },
  fieldInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 16,
    marginHorizontal: 20,
    paddingBottom: 8,
    borderBottomColor: Colors.secondaryText,
    borderBottomWidth: 0.5,
  },
  textInput: {
    width: "100%",
    fontSize: 16,
    fontFamily: "poppins-reg",
    color: Colors.primaryText,
    paddingLeft: 8,
  },
  headerSection: {
    width: "100%",
    marginTop: 40,
    marginBottom: 30,
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 38,
    color: Colors.primaryText,
    textAlign: "left",
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 19,
    color: Colors.secondaryText,
    textAlign: "left",
    marginBottom: 20,
  },
  icon: {
    paddingRight: 4,
  },
  button: {
    backgroundColor: Colors.primaryTheme,
    paddingHorizontal: 35,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 20,
    marginBottom: 30,
  },
  signUpOrSignIn: {
    color: Colors.primaryTheme,
    fontFamily: "poppins-semibold",
  },
  mainSection: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default SignUpScreen;
