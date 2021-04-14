import React, { useState, useEffect, Fragment } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { setToast } from "../store/actions/toasts";
import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import LogoIcon from "../assets/bookmark-img.png";

import { Auth } from "@aws-amplify/auth";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [formState, setFormState] = useState({
    userTag: "",
    email: "",
    password: "",
    authCode: "",
    formType: "signUp",
  });
  const { userTag, email, password, authCode, formType } = formState;

  useEffect(() => {
    if (
      (formType === "signIn" && email && password) ||
      (formType === "signUp" && userTag && email && password) ||
      (formType === "confirmSignUp" && authCode)
    ) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }
  }, [formState]);

  const handleSetFieldInput = (event, field) => {
    let value = event.nativeEvent.text;
    if (field === "authCode") {
      value = value.replace(/[^0-9]/g, "");
    }
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  const updateFormType = (formType) => {
    setFormState((prevState) => ({
      ...prevState,
      formType,
    }));
    3;
  };

  const signUp = async () => {
    const { userTag, email, password } = formState;
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { email, preferred_username: userTag },
      });

      updateFormType("confirmSignUp");
    } catch (err) {
      const msg = err.message;
      dispatch(setToast("toastWarning", msg, "ios-close-circle"));
    }
  };

  const confirmSignUp = async () => {
    try {
      const { email, authCode } = formState;
      await Auth.confirmSignUp(email, authCode);

      updateFormType("signIn");
      dispatch(
        setToast("toastInfo", "Verification Complete!", "ios-checkmark-circle")
      );
    } catch (err) {
      console.log(err);
      const msg = err.message;
      dispatch(setToast("toastWarning", msg, "ios-close-circle"));
    }
  };

  const signIn = async () => {
    const { email, password } = formState;

    try {
      await Auth.signIn({ username: email, password });
      dispatch(
        setToast("toastInfo", "Log in Successful", "ios-checkmark-circle")
      );
      navigation.popToTop();
    } catch (err) {
      let msg;
      let toastType = "toastWarning";
      switch (err.code) {
        case "NotAuthorizedException":
          msg = "Incorrect email or password";
          break;
        case "UserNotFoundException":
          msg = "User does not exist";
          break;
        case "UserNotConfirmedException":
          try {
            msg = "Email needs to be verified";
            await Auth.resendSignUp(email);
            console.log("Resending verification email");
          } catch (err) {
            console.log(err);
            msg = "Something went wrong";
            toastType = "toastError";
          }
          updateFormType("confirmSignUp");
          break;
        default:
          msg = "Something went wrong";
          toastType = "toastError";
      }
      dispatch(setToast(toastType, msg, "ios-close-circle"));
    }
  };

  return (
    <View style={styles.screen}>
      {formState.formType === "signUp" && (
        <Fragment>
          <View style={styles.headerSection}>
            <Image style={styles.logo} source={LogoIcon} />
            <CustomText style={styles.header} option='thin'>
              Welcome
            </CustomText>
            <CustomText style={styles.subHeader} option='mid'>
              Sign up to use Vocabular
            </CustomText>
          </View>
          <View style={styles.mainSection}>
            <View style={styles.fieldInput}>
              <Ionicons
                name={"ios-person-outline"}
                size={26}
                style={styles.icon}
                color={Colors.iconLightGray}
              />
              <TextInput
                style={styles.textInput}
                onChange={(event) => handleSetFieldInput(event, "userTag")}
                placeholder='Username'
                value={formState.userTag}
              />
            </View>
            <View style={styles.fieldInput}>
              <Ionicons
                name={"ios-mail-outline"}
                size={26}
                style={styles.icon}
                color={Colors.iconLightGray}
              />
              <TextInput
                style={styles.textInput}
                onChange={(event) => handleSetFieldInput(event, "email")}
                placeholder='Email address'
                value={formState.email}
              />
            </View>
            <View style={styles.fieldInput}>
              <Ionicons
                name={"ios-lock-closed-outline"}
                size={26}
                style={styles.icon}
                color={Colors.iconLightGray}
              />
              <TextInput
                style={styles.textInput}
                onChange={(event) => handleSetFieldInput(event, "password")}
                placeholder='Password'
                secureTextEntry={true}
                value={formState.password}
              />
            </View>
            <View
              style={[styles.button, !submitEnabled && styles.buttonDisabled]}
            >
              <TouchableOpacity onPress={signUp}>
                <CustomText option='mid' style={{ color: "#fff" }}>
                  Sign Up
                </CustomText>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <CustomText option='bodyGray'>
                Already have an account?
              </CustomText>
              <TouchableOpacity onPress={() => updateFormType("signIn")}>
                <CustomText option='body' style={styles.signUpOrSignIn}>
                  Sign In
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </Fragment>
      )}
      {formState.formType === "confirmSignUp" && (
        <Fragment>
          <View style={styles.headerSection}>
            <Image style={styles.logo} source={LogoIcon} />
            <CustomText style={styles.header} option='thin'>
              Verify Email
            </CustomText>
            <CustomText style={styles.subHeader} option='mid'>
              Please input the verification code sent to your email. Your email
              is only used to recover your password.
            </CustomText>
          </View>
          <View style={styles.fieldInput}>
            <Ionicons
              name={"ios-checkmark-circle"}
              size={26}
              style={styles.icon}
              color={Colors.iconLightGray}
            />
            <TextInput
              style={styles.textInput}
              onChange={(event) => handleSetFieldInput(event, "authCode")}
              value={formState.authCode}
              placeholder='Verification Code'
              keyboardType='numeric'
            />
          </View>
          <View
            style={[styles.button, !submitEnabled && styles.buttonDisabled]}
          >
            <TouchableOpacity onPress={confirmSignUp}>
              <CustomText option='mid' style={{ color: "#fff" }}>
                Confirm Sign Up
              </CustomText>
            </TouchableOpacity>
          </View>
        </Fragment>
      )}
      {formState.formType === "signIn" && (
        <Fragment>
          <View style={styles.headerSection}>
            <Image style={styles.logo} source={LogoIcon} />
            <CustomText style={styles.header} option='thin'>
              Welcome Back
            </CustomText>
            <CustomText style={styles.subHeader} option='mid'>
              Sign in to Vocabular
            </CustomText>
          </View>
          <View style={styles.mainSection}>
            <View style={styles.fieldInput}>
              <Ionicons
                name={"ios-mail-outline"}
                size={26}
                style={styles.icon}
                color={Colors.iconLightGray}
              />
              <TextInput
                style={styles.textInput}
                onChange={(event) => handleSetFieldInput(event, "email")}
                placeholder='Email address'
                value={formState.email}
              />
            </View>
            <View style={styles.fieldInput}>
              <Ionicons
                name={"ios-lock-closed-outline"}
                size={26}
                style={styles.icon}
                color={Colors.iconLightGray}
              />
              <TextInput
                style={styles.textInput}
                onChange={(event) => handleSetFieldInput(event, "password")}
                placeholder='Password'
                secureTextEntry={true}
                value={formState.password}
              />
            </View>
            <View
              style={[styles.button, !submitEnabled && styles.buttonDisabled]}
            >
              <TouchableOpacity onPress={signIn}>
                <CustomText option='mid' style={{ color: "#fff" }}>
                  Sign In
                </CustomText>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <CustomText option='bodyGray'>
                Don't have an account yet?
              </CustomText>
              <TouchableOpacity onPress={() => updateFormType("signUp")}>
                <CustomText option='body' style={styles.signUpOrSignIn}>
                  Sign Up
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </Fragment>
      )}
    </View>
  );
};

LoginScreen.propTypes = {};

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
    marginTop: 35,
    marginBottom: 35,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  signUpOrSignIn: {
    color: Colors.primaryTheme,
    fontFamily: "poppins-semibold",
    marginLeft: 7,
  },
  mainSection: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default LoginScreen;
