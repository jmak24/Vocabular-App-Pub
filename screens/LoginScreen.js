import React, { useState, useEffect, Fragment } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { setToast } from "../store/actions/toasts";
import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import LogoIcon from "../assets/icon-transparent.png";
import { fetchUserProfile } from "../store/actions/loading";
import Loading from "../components/Loading";

import { Auth } from "@aws-amplify/auth";

const initialFormState = {
  userTag: "",
  email: "",
  password: "",
  authCode: "",
};

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const FETCH_USER_PROFILE = useSelector(
    (state) => state.loading.FETCH_USER_PROFILE
  );

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [formState, setFormState] = useState({
    ...initialFormState,
    formType: "signUp",
  });
  const { userTag, email, password, authCode, formType } = formState;

  useEffect(() => {
    if (
      (formType === "signIn" && email && password) ||
      (formType === "signUp" && userTag && email && password) ||
      (formType === "forgotPassword" && email) ||
      (formType === "resetPassword" && email && authCode && password)
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

  const updateFormType = (formType, reset) => {
    setFormState((prevState) => {
      const formData = reset ? initialState : prevState;
      return {
        ...formData,
        formType,
      };
    });
  };

  const signUp = async () => {
    const { userTag, email, password } = formState;
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { email, preferred_username: userTag },
      });
      setToast("toastInfo", "Sign Up Complete!", "ios-checkmark-circle");
      updateFormType("signIn", false);
    } catch (err) {
      console.log("signUp", err);
      const msg = err.message;
      dispatch(setToast("toastWarning", msg, "ios-close-circle"));
    }
  };

  const signIn = async () => {
    const { email, password } = formState;

    try {
      dispatch(fetchUserProfile("REQUEST"));
      await Auth.signIn({ username: email, password });
      dispatch(
        setToast("toastInfo", "Sign in Successful", "ios-checkmark-circle")
      );
      navigation.popToTop();
    } catch (err) {
      dispatch(fetchUserProfile("FAIL"));
      console.log("signIn", err);
      let msg;
      let toastType = "toastWarning";
      switch (err.code) {
        case "NotAuthorizedException":
          msg = "Incorrect email or password";
          break;
        case "UserNotFoundException":
          msg = "User does not exist";
          break;
        default:
          msg = "Something went wrong";
          toastType = "toastError";
      }
      dispatch(setToast(toastType, msg, "ios-close-circle"));
    }
  };

  const forgotPassword = async () => {
    try {
      const { email } = formState;
      await Auth.forgotPassword(email);

      updateFormType("resetPassword", false);
      dispatch(
        setToast(
          "toastInfo",
          "An email has been sent to you",
          "ios-checkmark-circle"
        )
      );
    } catch (err) {
      console.log(err);
      const msg = err.message;
      dispatch(setToast("toastWarning", msg, "ios-close-circle"));
    }
  };

  const resetPassword = async () => {
    try {
      const { email, authCode, password } = formState;
      await Auth.forgotPasswordSubmit(email, authCode, password);

      updateFormType("signIn", false);
      dispatch(
        setToast(
          "toastInfo",
          "Your password has been reset!",
          "ios-checkmark-circle"
        )
      );
    } catch (err) {
      console.log("resetPassword", err);
      const msg = err.message;
      dispatch(setToast("toastWarning", msg, "ios-close-circle"));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {FETCH_USER_PROFILE.loading ? (
        <Loading />
      ) : (
        <ScrollView>
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
                      onChange={(event) =>
                        handleSetFieldInput(event, "userTag")
                      }
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
                      onChange={(event) =>
                        handleSetFieldInput(event, "password")
                      }
                      placeholder='Password'
                      secureTextEntry={true}
                      value={formState.password}
                    />
                  </View>
                  <View
                    style={[
                      styles.button,
                      !submitEnabled && styles.buttonDisabled,
                    ]}
                  >
                    <TouchableOpacity onPress={signUp}>
                      <CustomText option='mid' style={{ color: "#fff" }}>
                        Sign Up
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.otherOption}
                    onPress={() => updateFormType("signIn", true)}
                  >
                    <CustomText option='bodyGray'>
                      Already have an account?
                    </CustomText>
                    <CustomText option='body' style={styles.signUpOrSignIn}>
                      Sign In
                    </CustomText>
                  </TouchableOpacity>
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
                    Please input the verification code sent to your email. Your
                    email is only used to recover your password.
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
                  style={[
                    styles.button,
                    !submitEnabled && styles.buttonDisabled,
                  ]}
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
                      onChange={(event) =>
                        handleSetFieldInput(event, "password")
                      }
                      placeholder='Password'
                      secureTextEntry={true}
                      value={formState.password}
                    />
                  </View>
                  <View
                    style={[
                      styles.button,
                      !submitEnabled && styles.buttonDisabled,
                    ]}
                  >
                    <TouchableOpacity onPress={signIn}>
                      <CustomText option='mid' style={{ color: "#fff" }}>
                        Sign In
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.otherOption}
                    onPress={() => updateFormType("signUp", true)}
                  >
                    <CustomText option='bodyGray'>
                      Don't have an account yet?
                    </CustomText>
                    <CustomText option='body' style={styles.signUpOrSignIn}>
                      Sign Up
                    </CustomText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => updateFormType("forgotPassword", true)}
                  >
                    <CustomText option='bodyGray'>
                      Forgot your password?
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </Fragment>
            )}
            {formState.formType === "forgotPassword" && (
              <Fragment>
                <View style={styles.headerSection}>
                  <Image style={styles.logo} source={LogoIcon} />
                  <CustomText style={styles.subHeader} option='mid'>
                    Enter your email to reset your password.
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
                  <View
                    style={[
                      styles.button,
                      !submitEnabled && styles.buttonDisabled,
                    ]}
                  >
                    <TouchableOpacity onPress={forgotPassword}>
                      <CustomText option='mid' style={{ color: "#fff" }}>
                        Reset password
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.otherOption}
                    onPress={() => updateFormType("signIn", true)}
                  >
                    <CustomText option='bodyGray'>
                      Return to Sign in screen
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </Fragment>
            )}
            {formState.formType === "resetPassword" && (
              <Fragment>
                <View style={styles.headerSection}>
                  <Image style={styles.logo} source={LogoIcon} />
                  <CustomText style={styles.subHeader} option='mid'>
                    Enter the code you received in your email and input a new
                    password.
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
                      name={"ios-checkmark-circle"}
                      size={26}
                      style={styles.icon}
                      color={Colors.iconLightGray}
                    />
                    <TextInput
                      style={styles.textInput}
                      onChange={(event) =>
                        handleSetFieldInput(event, "authCode")
                      }
                      value={formState.authCode}
                      placeholder='Verification Code'
                      keyboardType='numeric'
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
                      onChange={(event) =>
                        handleSetFieldInput(event, "password")
                      }
                      placeholder='Password'
                      secureTextEntry={true}
                      value={formState.password}
                    />
                  </View>
                  <View
                    style={[
                      styles.button,
                      !submitEnabled && styles.buttonDisabled,
                    ]}
                  >
                    <TouchableOpacity onPress={resetPassword}>
                      <CustomText option='mid' style={{ color: "#fff" }}>
                        Reset password
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                </View>
              </Fragment>
            )}
          </View>
        </ScrollView>
      )}
      <View style={styles.closeBtn}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Ionicons name={"ios-close-outline"} size={40} color='#a3a3a3' />
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

LoginScreen.propTypes = {};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screen: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
  },
  closeBtn: {
    position: "absolute",
    right: 25,
    top: 20,
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
    marginTop: 30,
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
    opacity: 0.45,
  },
  otherOption: {
    flexDirection: "row",
    marginBottom: 15,
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
