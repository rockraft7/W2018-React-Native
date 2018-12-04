import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Text from "./Text.component";
import { COLORS, CommonStyles } from "../helpers/common-styles";
import NavigationService from "../helpers/navigation-service";
import { connect } from "react-redux";
import { TOGGLE_MENU, SELECT_MENU } from "../actions/quick-access-menu.action";
import { sizeFont, sizeWidth } from "../helpers/size.helper";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  whiteCurtain: {
    opacity: 0.9,
    backgroundColor: "#FFF"
  },
  quickLists: {
    position: "absolute",
    bottom: 85,
    right: 25
  },
  quickItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "flex-end"
  },
  quickText: {
    color: COLORS.GRAYISH_BLUE,
    fontSize: sizeFont(4),
    marginRight: 20
  },
  item: {
    width: sizeWidth(14),
    height: sizeWidth(14),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizeWidth(7),
    ...CommonStyles.boxShadow
  },
  activedItem: {
    backgroundColor: "rgb(55, 163, 184)"
  },
  inactivedItem: {
    backgroundColor: "#FFF"
  },
  quickIcon: {
    width: sizeWidth(7),
    height: sizeWidth(7)
  }
});

class QuickAccessMenu extends Component {
  render() {
    return (
        this.props.isOpen && this._renderDetailMenu()
    );
  }

  _renderDetailMenu = () => (
    <TouchableWithoutFeedback onPress={() => this.props.toggleMenu()}>
      <View style={styles.container}>
        <View style={[styles.container, styles.whiteCurtain]} />
        <View style={styles.quickLists}>
          {this.props.menus.map((item, index) =>
            this._renderMenuItem(item, index)
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  _renderMenuItem = (item, index) => (
    <View style={styles.quickItem} key={index}>
      <Text style={styles.quickText}>{item.id}</Text>
      <TouchableOpacity onPress={() => this.onSelect(item)}>
        <View
          style={[
            styles.item,
            item.actived ? styles.activedItem : styles.inactivedItem
          ]}
        >
          {item.actived ? (
            <Image
              source={item.activedIcon}
              resizeMode={"contain"}
              style={styles.quickIcon}
            />
          ) : (
            <Image
              source={item.icon}
              resizeMode={"contain"}
              style={styles.quickIcon}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  onSelect(menu) {
    const {currentEvent} = this.props;
    this.props.selectMenu(menu.id);
    NavigationService.navigate(menu.screen, {
      currentEvent,
      eventId: currentEvent.eventId
    });
  }
}

const mapStateToProps = state => {
  return state.quickAccessMenu;
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => dispatch({ type: TOGGLE_MENU }),
    selectMenu: selectedMenuId =>
      dispatch({ type: SELECT_MENU, selectedMenuId })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickAccessMenu);
