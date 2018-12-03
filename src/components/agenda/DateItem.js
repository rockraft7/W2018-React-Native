import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import Text from "../Text.component";
import { COLORS } from "../../helpers/common-styles";
import PropTypes from "prop-types";
import moment from "moment";
import { fontMaker } from "../../helpers/font.helper";

const styles = StyleSheet.create({
  wrapperItem: {
    flexDirection: "row",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderColor: COLORS.GRAY
  },
  dayMonthContainer: {
    width: 52,
    height: 52,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.GRAYISH_BLUE,
    borderRadius: 4,
    zIndex: 2
  },
  day: {
    paddingTop: 7,
    fontSize: 28,
    lineHeight: 27,
    color: "#FFF"
  },
  month: {
    paddingBottom: 3,
    fontSize: 15,
    lineHeight: 15,
    color: "#FFF",
    ...fontMaker({ weight: "500" })
  },
  containerDayInOrder: {
    marginLeft: -4,
    height: "100%",
    justifyContent: "center",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    paddingLeft: 14,
    paddingRight: 11
  },
  activeItem: {
    borderColor: COLORS.GRAY,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  dayInOrder: {
    fontSize: 17,
    lineHeight: 20,
    color: COLORS.GRAYISH_BLUE
  },
  inactiveItem: {
    backgroundColor: "#FFF",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
    width: "100%",
    height: "100%",
    opacity: 0.8
  }
});

const DateItem = ({ date, dayInOrder, isActive }) => {
  return (
    <View style={styles.wrapperItem}>
      <View style={styles.dayMonthContainer}>
        <Text style={styles.day}>{moment(date).format("DD")}</Text>
        <Text style={styles.month}>
          {moment(date)
            .format("MMM")
            .toUpperCase()}
        </Text>
      </View>
      <View style={[styles.containerDayInOrder, isActive && styles.activeItem]}>
        <Text style={styles.dayInOrder}>DAY {dayInOrder}</Text>
      </View>
      {!isActive && <View style={styles.inactiveItem} />}
    </View>
  );
};

DateItem.propTypes = {
  date: PropTypes.object.isRequired,
  dayInOrder: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default DateItem;
