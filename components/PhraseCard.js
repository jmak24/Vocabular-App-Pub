import React, { Fragment } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import CustomText from "./CustomText";
import {
  handleRemovePhrase,
  handleTogglePhraseLike,
  handleTogglePhraseVisibility,
} from "../store/actions/phrases";
import { onShare } from "../utils/helper";

const PhraseCard = ({ details, myPhraseSection, authedUserId }) => {
  const dispatch = useDispatch();
  const { id, phrase, likes, isPublic, authorId, author } = details;
  const eyeIcon = isPublic ? "ios-eye-outline" : "ios-eye-off-outline";
  const hasLiked = likes.includes(authedUserId);
  const isAuthor = authedUserId === authorId;
  // if you are author of phrase and is set to private
  if (isAuthor && !myPhraseSection && !isPublic) return null;

  return (
    <View style={styles.phraseCard}>
      <CustomText option='body'>"{phrase}"</CustomText>
      <View style={styles.bottomSection}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => dispatch(onShare({ message: phrase }))}
          >
            <Ionicons
              name={"ios-arrow-redo-outline"}
              size={25}
              style={styles.icon}
              color={Colors.iconLightGray}
            />
          </TouchableOpacity>
          {myPhraseSection ? (
            <Fragment>
              <TouchableOpacity
                onPress={() =>
                  dispatch(
                    handleTogglePhraseVisibility({
                      phraseId: id,
                      isPublic: !isPublic,
                    })
                  )
                }
              >
                <Ionicons
                  name={eyeIcon}
                  size={25}
                  style={styles.icon}
                  color={Colors.iconLightGray}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dispatch(handleRemovePhrase({ phraseId: id }))}
              >
                <Ionicons
                  name={"ios-trash-outline"}
                  size={25}
                  style={styles.icon}
                  color={Colors.iconLightGray}
                />
              </TouchableOpacity>
            </Fragment>
          ) : (
            <CustomText option='thin'>{author && author.userTag}</CustomText>
          )}
        </View>

        <View style={styles.likes}>
          {likes.length > 0 && (
            <CustomText option='bodyGray'>{likes.length}</CustomText>
          )}
          <TouchableOpacity
            onPress={() =>
              dispatch(
                handleTogglePhraseLike({
                  phraseId: id,
                  authedUserId,
                  hasLiked,
                  likes,
                })
              )
            }
            disabled={myPhraseSection}
          >
            <Ionicons
              name={hasLiked ? "ios-heart" : "ios-heart-outline"}
              size={24}
              style={styles.heartIcon}
              color={hasLiked ? Colors.iconHeartFilled : Colors.iconLightGray}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

PhraseCard.propTypes = {
  details: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  phraseCard: {
    width: "100%",
    borderRadius: 15,
    paddingVertical: 11,
    paddingHorizontal: 13,
    marginBottom: 16,
    overflow: "hidden",
    backgroundColor: Colors.background,
  },
  bottomSection: {
    width: "100%",
    paddingTop: 30,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    paddingRight: 23,
  },
  heartIcon: {
    paddingLeft: 11,
  },
});

export default PhraseCard;
