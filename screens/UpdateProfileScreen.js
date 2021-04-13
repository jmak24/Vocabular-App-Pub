import React, { useState, Fragment, useEffect } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "@aws-amplify/auth";

import { setToast } from "../store/actions/toasts";
import { handleUpdateUserTag } from "../store/actions/userProfile";
import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import TopNavBar from "../components/TopNavBar";
import Sizing from "../constants/Sizing";

const UpdateProfileScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { id: userId, userTag } = useSelector((state) => state.userProfile);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [formState, setFormState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    newUserTag: "",
  });
  const { formType } = route.params;
  const {
    currentPassword,
    newPassword,
    confirmNewPassword,
    newUserTag,
  } = formState;

  useEffect(() => {
    if (
      (formType === "changePassword" &&
        currentPassword &&
        newPassword &&
        confirmNewPassword) ||
      (formType === "changeUserTag" && newUserTag)
    ) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }
  }, [formState]);

  const handleSetFieldInput = (event, field) => {
    let value = event.nativeEvent.text;
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  const screenTitle = () => {
    switch (formType) {
      case "changePassword":
        return "Change Password";
      case "changeUserTag":
        return "Change Username";
      default:
        return "";
    }
  };

  const handleSaveChanges = async () => {
    if (formType === "changePassword") {
      const { currentPassword, newPassword, confirmNewPassword } = formState;
      if (newPassword !== confirmNewPassword) {
        dispatch(
          setToast(
            "toastWarning",
            "Your new password does not match",
            "ios-close-circle"
          )
        );
        return;
      }
      if (newPassword.length < 6) {
        dispatch(
          setToast(
            "toastWarning",
            "Your new password must be longer than 6 characters",
            "ios-close-circle"
          )
        );
        return;
      }
      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        await Auth.changePassword(cognitoUser, currentPassword, newPassword);
        dispatch(
          setToast("toastInfo", "Password changed", "ios-checkmark-circle")
        );
        navigation.goBack();
      } catch (err) {
        dispatch(
          setToast(
            "toastError",
            "Your current password was incorrect",
            "ios-close-circle"
          )
        );
      }
    }

    if (formType === "changeUserTag") {
      dispatch(
        handleUpdateUserTag({ id: userId, currentUserTag: userTag, newUserTag })
      );
      navigation.goBack();
    }
  };

  return (
    <View style={{ ...styles.screen, paddingTop: Sizing.topNavBarHeight }}>
      <TopNavBar navigation={navigation} title={screenTitle()} />
      <View style={styles.mainSection}>
        {formType === "changePassword" && (
          <Fragment>
            <View style={styles.fieldInput}>
              <TextInput
                style={styles.textInput}
                onChange={(event) =>
                  handleSetFieldInput(event, "currentPassword")
                }
                placeholder='Current Password'
                value={currentPassword}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.fieldInput}>
              <TextInput
                style={styles.textInput}
                onChange={(event) => handleSetFieldInput(event, "newPassword")}
                placeholder='New Password'
                value={newPassword}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.fieldInput}>
              <TextInput
                style={styles.textInput}
                onChange={(event) =>
                  handleSetFieldInput(event, "confirmNewPassword")
                }
                placeholder='Confirm New Password'
                secureTextEntry={true}
                value={confirmNewPassword}
                secureTextEntry={true}
              />
            </View>
          </Fragment>
        )}
        {formType === "changeUserTag" && (
          <Fragment>
            <View style={styles.fieldInput}>
              <TextInput
                style={styles.textInput}
                editable={false}
                value={userTag}
              />
            </View>
            <View style={styles.fieldInput}>
              <TextInput
                style={styles.textInput}
                onChange={(event) => handleSetFieldInput(event, "newUserTag")}
                placeholder='New Username'
                value={newUserTag}
              />
            </View>
          </Fragment>
        )}
        <View style={[styles.button, !submitEnabled && styles.buttonDisabled]}>
          <TouchableOpacity
            onPress={handleSaveChanges}
            disabled={!submitEnabled}
          >
            <CustomText option='mid' style={{ color: "#fff" }}>
              Save Changes
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

UpdateProfileScreen.propTypes = {};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: Colors.grayTint,
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
  mainSection: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "50%",
  },
});

export default UpdateProfileScreen;
