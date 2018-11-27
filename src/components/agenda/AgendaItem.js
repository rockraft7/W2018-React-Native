import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Text from "../Text.component";
import _ from "lodash";
import PropTypes from "prop-types";
import { OPEN_QRCODE_POPUP } from "../../actions/qrcode.action";
import { COLORS } from "../../helpers/common-styles";

const { width } = Dimensions.get("window");
const WIDTH_CONTAINER_ICON = 40;
const WIDTH_CONTAINER_AGENDA =
  width - WIDTH_CONTAINER_ICON * 2 - 20 * 2 - 11 * 2;

const styles = StyleSheet.create({
  wrapperItem: {
    flexDirection: "column"
  },
  containerAgendaItem: {
    flexDirection: "row",
    backgroundColor: COLORS.GREEN_PET_ICT,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  containerIconToggle: {
    width: WIDTH_CONTAINER_ICON,
    height: WIDTH_CONTAINER_ICON,
    alignItems: "center",
    justifyContent: "center"
  },
  iconToggle: {
    width: 24,
    height: 12
  },
  containerAgenda: {
    width: WIDTH_CONTAINER_AGENDA,
    flexDirection: "column",
    paddingHorizontal: 20
  },
  agendaName: {
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 22,
    color: "#FFF"
  },
  venueName: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 16,
    color: "#FFF"
  },
  containerIconQRCode: {
    width: WIDTH_CONTAINER_ICON,
    height: WIDTH_CONTAINER_ICON,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: COLORS.GRAYISH_BLUE,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 4,
    shadowOpacity: 0.6,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GRAY
  },
  iconQRCode: {
    width: 22,
    height: 22
  },
  containerSubAgendaList: {
    paddingVertical: 10
  },
  // begin styles for SubAgenda Item
  wrapperSubAgenda: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    marginVertical: 5,
    paddingHorizontal: 1,
    borderRadius: 4,
    shadowColor: COLORS.GRAYISH_BLUE,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 4,
    shadowOpacity: 0.15
  },
  containerTime: {
    paddingHorizontal: 15,
    paddingVertical: 13,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: COLORS.GRAYISH_BLUE,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.GRAY
  },
  time: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFF"
  },
  containerSubAgenda: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "column"
  },
  subAgendaName: {
    fontSize: 15,
    lineHeight: 17,
    color: COLORS.GRAYISH_BLUE
  },
  subVenueName: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 14,
    color: "rgba(36, 37, 61, .5)"
  }
});

const SubAgendaItem = ({ subAgenda }) => (
  <View style={styles.wrapperSubAgenda}>
    <View style={styles.containerTime}>
      <Text style={styles.time}>{_.get(subAgenda, "timeFrom")}</Text>
      <Text style={styles.time}>{_.get(subAgenda, "timeTo")}</Text>
    </View>
    <View style={styles.containerSubAgenda}>
      <Text style={styles.subAgendaName}>
        {_.get(subAgenda, "agendaName")}
      </Text>
      <Text style={styles.subVenueName}>
        {_.get(subAgenda, "venue")}
      </Text>
    </View>
  </View>
);

SubAgendaItem.propsTypes = {
  subAgenda: PropTypes.object.isRequired
};

class AgendaItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  _onPressToggleIcon = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { agenda } = this.props;
    const { isOpen } = this.state;
    const iconToggle = isOpen
      ? require("../../../assets/images/arrow_up.png")
      : require("../../../assets/images/arrow_down.png");
    return (
      <View style={styles.wrapperItem}>
        <View style={styles.containerAgendaItem}>
          <TouchableOpacity
            style={styles.containerIconToggle}
            onPress={() => this._onPressToggleIcon()}
          >
            <Image style={styles.iconToggle} source={iconToggle} />
          </TouchableOpacity>
          <View style={styles.containerAgenda}>
            <Text style={styles.agendaName}>
              {_.get(agenda, "agendaName")}
            </Text>
            <Text style={styles.venueName}>
              {_.get(agenda, "venue")}
            </Text>
          </View>
          <TouchableOpacity
            elevation={5}
            style={styles.containerIconQRCode}
            onPress={() => this.props.openPopup(_.get(agenda, "agendaId"))}
          >
            <Image
              style={styles.iconQRCode}
              source={require("../../../assets/images/qrcode.png")}
            />
          </TouchableOpacity>
        </View>
        {isOpen && (
          <View style={styles.containerSubAgendaList}>
            {agenda.subAgendas.map((subAgenda, index) => (
              <SubAgendaItem key={index} subAgenda={subAgenda} />
            ))}
          </View>
        )}
      </View>
    );
  }
}

AgendaItem.propsTypes = {
  agenda: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    openPopup: (agendaId) => dispatch({ type: OPEN_QRCODE_POPUP, agendaId })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AgendaItem);