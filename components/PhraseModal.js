import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import CustomText from "./CustomText";
import { TextInput } from "react-native-gesture-handler";
import { setToast } from "../store/actions/toasts";
import { handlePostPhrase } from "../store/actions/phrases";

const CollapsedHeight = 60;
const ExpandedHeight = 160;

const PhraseModal = ({ toggleModal, modalVisible, word }) => {
  const dispatch = useDispatch();
  const [isPublic, setIsPublic] = useState(true);
  const [postBtnDisabled, setPostBtnDisabled] = useState(true);
  const [textInput, setTextInput] = useState("");
  const eyeIcon = isPublic ? "ios-eye" : "ios-eye-off";

  const inputFieldRef = useRef(null);

  const closeModal = () => {
    toggleModal();
    setTextInput("");
  };

  const postPhrase = () => {
    if (!postBtnDisabled) {
      dispatch(handlePostPhrase({ text: textInput, isPublic }));
      closeModal();
    } else {
      const warningMsg =
        "Phrase must contain word '" + word + "' at least once";
      dispatch(setToast("toastWarning", warningMsg, "ios-close-circle"));
      closeModal();
    }
  };

  const onTextInput = (text) => {
    setTextInput(text);
    // use indexOf instead and then check if word is independent
    if (text.includes(" " + word + " ")) {
      setPostBtnDisabled(false);
    } else {
      setPostBtnDisabled(true);
    }
  };

  return (
    <Modal animationType='slide' transparent={true} visible={modalVisible}>
      <KeyboardAvoidingView style={styles.centeredView} behavior='padding'>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Ionicons
              name={"ios-close-circle"}
              size={45}
              color={Colors.iconLightGray}
            />
          </TouchableOpacity>
          <TextInput
            autoFocus
            style={styles.textInputArea}
            multiline={true}
            maxLength={200}
            ref={inputFieldRef}
            onChangeText={onTextInput}
          />
          <View style={styles.bottomSection}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CustomText option='thin'>{textInput.length} / 200</CustomText>
              <TouchableOpacity onPress={() => setIsPublic(!isPublic)}>
                <Ionicons
                  name={eyeIcon}
                  size={28}
                  style={{ paddingLeft: 12 }}
                  color={Colors.iconLightGray}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={postPhrase}>
              <View
                style={{
                  ...styles.postButton,
                  backgroundColor: postBtnDisabled
                    ? Colors.grayTint
                    : Colors.primaryTheme,
                }}
              >
                <CustomText
                  option='mid'
                  style={{
                    color: postBtnDisabled ? Colors.secondaryText : "#fff",
                  }}
                >
                  Post
                </CustomText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#8a8a8a",
    // opacity: 0.8,
  },
  modalView: {
    width: "84%",
    height: 290,
    borderRadius: 15,
    paddingTop: 15,
    paddingHorizontal: 13,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.background,
  },
  closeButton: {
    position: "absolute",
    right: -20,
    top: -20,
    zIndex: 100,
  },
  textInputArea: {
    width: "100%",
    height: "85%",
    textAlignVertical: "top",
    fontSize: 16,
    fontFamily: "poppins-reg",
  },
  bottomSection: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  postButton: {
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 12,
  },
});

export default PhraseModal;
